import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly _ticketRepository: Repository<Ticket>,
  ) {}

  async verifyTicket(qrCodeData: any): Promise<any> {
    try {
      // Find the ticket in the database
      const ticket = await this._ticketRepository.findOne({
        where: { passengerName: qrCodeData?.passengerName },
      });

      if (!ticket) {
        return 'Ticket not found';
      }

      // Handle already used or finished tickets
      if (ticket.status === 'used' || ticket.status === 'finished') {
        return 'Ticket has already been used or is finished';
      }

      // Update ticket status
      ticket.status = 'used';
      await this._ticketRepository.save(ticket);

      return 'Ticket validated and marked as used';
    } catch (error) {
      console.error(error);
      return 'Invalid QR code';
    }
  }
}
