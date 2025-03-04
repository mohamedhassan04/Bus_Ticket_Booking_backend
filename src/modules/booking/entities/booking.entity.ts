import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Booking extends Node {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Schedule, (schedule) => schedule.id)
  @JoinColumn()
  schedule: Schedule;

  @Column({ type: 'int' })
  seatNumber: number;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled'] }) // pending, confirmed, cancelled
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountPaid: number;
}
