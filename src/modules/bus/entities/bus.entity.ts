import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Bus extends Node {
  @Column()
  busNumber: string;

  @Column({ type: 'enum', enum: ['AC', 'Non-AC', 'Sleeper'] })
  busType: string;

  @Column()
  totalSeats: number;

  @Column()
  company: string;

  @OneToMany(() => Schedule, (schedule) => schedule.bus)
  schedules: Schedule[];
}
