import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import jsQR from 'jsqr';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly _ticketRepository: Repository<Ticket>,
  ) {}

  async verifyTicket(qrCodeBase64: string): Promise<string> {
    try {
      // Convert base64 to a buffer
      const buffer = Buffer.from(qrCodeBase64.split(',')[1], 'base64');

      // Create an ImageData object manually
      const image = await createImageData(buffer);

      // Decode QR code
      const code = jsQR(image.data, image.width, image.height);
      if (!code) {
        return 'Invalid QR code';
      }

      const ticketData = JSON.parse(code.data);

      // Check if ticket exists in the database
      const ticket = await this._ticketRepository.findOne({
        where: { id: ticketData.ticketId },
      });

      if (!ticket) {
        return 'Ticket not found';
      }

      // Handle used or finished tickets
      if (ticket.status === 'used' || ticket.status === 'finished') {
        return 'Ticket has already been used or is finished';
      }

      // Update ticket status
      ticket.status = 'used';
      await this._ticketRepository.save(ticket);

      return 'Ticket validated and marked as finished';
    } catch (error) {
      console.error(error);
      return 'Invalid QR code';
    }
  }
}

// Helper function to create ImageData
async function createImageData(buffer: Buffer): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const { createCanvas, loadImage } = require('canvas');
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    loadImage(buffer)
      .then((image: any) => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        resolve(imageData);
      })
      .catch((err: any) => reject(err));
  });
}
