import { Node } from 'src/shared/node/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Bus extends Node {
  @Column()
  busNumber: string;

  @Column()
  busType: string; // AC, Non-AC, Sleeper, etc.

  @Column()
  totalSeats: number;

  @Column()
  company: string;
}
