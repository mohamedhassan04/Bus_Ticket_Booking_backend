import { Entity, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Node } from 'src/shared/node/common.entity';
import * as QRCode from 'qrcode';

@Entity()
export class Ticket extends Node {
  @ManyToOne(() => Booking, (booking) => booking.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  booking: Booking;

  @Column()
  seatNumber: string;

  @Column({ type: 'varchar', length: 255 })
  passengerName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  passengerEmail: string;

  @Column({ type: 'text', nullable: true })
  qrCode: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'used', 'finished'],
    default: 'pending',
  })
  status: string;

  @BeforeInsert()
  async generateQRCode() {
    const qrData = JSON.stringify({
      ticketId: this.id,
      seatNumber: this.seatNumber,
      passengerName: this.passengerName,
      bookingId: this.booking?.id,
    });

    this.qrCode = await QRCode.toDataURL(qrData);
  }
}
