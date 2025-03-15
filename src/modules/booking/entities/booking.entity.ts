import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Ticket } from 'src/modules/ticket/entities/ticket.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Booking extends Node {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Schedule, (schedule) => schedule.id)
  @JoinColumn()
  schedule: Schedule;

  @OneToMany(() => Ticket, (ticket) => ticket.booking, { cascade: true })
  tickets: Ticket[];

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number;
}
