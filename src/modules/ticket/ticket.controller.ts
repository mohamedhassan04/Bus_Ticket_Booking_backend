import { Controller, Post, Body } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('/verify')
  async verifyTicket(@Body('qrCode') qrCode: string): Promise<string> {
    return this.ticketService.verifyTicket(qrCode);
  }
}
