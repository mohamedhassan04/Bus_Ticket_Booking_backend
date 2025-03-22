import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { ConfigService } from '@nestjs/config';
import { Booking } from 'src/modules/booking/entities/booking.entity';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Payment) private _paymentRepository: Repository<Payment>,
    @InjectRepository(Booking) private _bookingRepository: Repository<Booking>,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2025-02-24.acacia',
      },
    );
  }

  async createPaymentIntent(
    bookingId: string,
    amount: number,
    currency: string = 'eur',
  ) {
    const booking = await this._bookingRepository.findOne({
      where: { id: bookingId },
    });
    if (!booking) throw new Error('Booking not found');

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      }, // Allow Stripe to attach a method dynamically
    });

    const payment = this._paymentRepository.create({
      booking,
      paymentMethod: 'card',
      transactionId: paymentIntent.id,
      status: 'pending',
      amount,
    });

    await this._paymentRepository.save(payment);

    return {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    };
  }

  async updatePaymentStatus(transactionId: string, status: string) {
    const payment = await this._paymentRepository.findOne({
      where: { transactionId },
    });
    if (!payment) throw new Error('Payment not found');

    payment.status = status;
    return this._paymentRepository.save(payment);
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      // Create a test Payment Method using a Stripe test card
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: 'tok_visa',
        },
      });

      // Attach the created payment method to the PaymentIntent
      const paymentIntent = await this.stripe.paymentIntents.update(
        paymentIntentId,
        {
          payment_method: paymentMethod.id,
        },
      );

      // Confirm the PaymentIntent
      const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
        paymentIntent.id,
      );

      // Handle the payment status
      if (confirmedPaymentIntent.status === 'succeeded') {
        // Update the payment status in your database
        const payment = await this._paymentRepository.findOne({
          where: { transactionId: confirmedPaymentIntent.id },
        });
        if (payment) {
          payment.status = 'succeeded';
          await this._paymentRepository.save(payment);
        }
      } else {
        console.log('Payment failed or still processing.');
        // Update status accordingly if the payment failed or is still pending
      }
      return confirmedPaymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Payment confirmation failed');
    }
  }
}
