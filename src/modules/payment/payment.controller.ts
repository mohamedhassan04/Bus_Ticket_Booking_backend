import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('intent')
  async createPaymentIntent(
    @Body() body: { bookingId: string; amount: number },
  ) {
    return this.paymentService.createPaymentIntent(body.bookingId, body.amount);
  }

  @Post('confirm')
  async confirmPayment(@Body('paymentIntentId') paymentIntentId: string) {
    const paymentIntent =
      await this.paymentService.confirmPayment(paymentIntentId);

    return paymentIntent;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentService.updatePaymentStatus(id, updatePaymentDto);
  // }
}
