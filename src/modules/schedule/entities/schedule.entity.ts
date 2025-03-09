import { Bus } from 'src/modules/bus/entities/bus.entity';
import { Route } from 'src/modules/route/entities/route.entity';
import { Node } from 'src/shared/node/common.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Schedule extends Node {
  @ManyToOne(() => Bus, (bus) => bus.id)
  @JoinColumn()
  bus: Bus;

  @ManyToOne(() => Route, (route) => route.id)
  @JoinColumn()
  route: Route;

  @Column({ type: 'date' })
  departureDate: string;

  @Column({ type: 'time' })
  departureTime: string;

  @Column({ type: 'date' })
  arrivalDate: string;

  @Column({ type: 'time' })
  arrivalTime: string;

  @Column('decimal', { precision: 10, scale: 2 })
  fare: number;
}
