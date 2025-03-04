import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Payment extends Node {
  @ManyToOne(() => Booking, (booking) => booking.id)
  @JoinColumn()
  booking: Booking;

  @Column()
  paymentMethod: string; // Credit Card, PayPal, etc.

  @Column()
  transactionId: string; // Payment gateway transaction ID

  @Column({ default: 'pending' }) // pending, successful, failed
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;
}
