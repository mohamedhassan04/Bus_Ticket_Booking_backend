import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Node } from 'src/shared/node/common.entity';

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
}
