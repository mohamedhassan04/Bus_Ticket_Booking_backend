import { Node } from 'src/shared/node/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Route extends Node {
  @Column()
  startLocation: string;

  @Column()
  endLocation: string;

  @Column('decimal', { precision: 10, scale: 2 })
  distance: number; // in km
}
