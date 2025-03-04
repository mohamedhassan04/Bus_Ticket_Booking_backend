import { Bus } from 'src/modules/bus/entities/bus.entity';
import { Route } from 'src/modules/route/entities/route.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Schedule extends Node {
  @ManyToOne(() => Bus, (bus) => bus.id)
  @JoinColumn()
  bus: Bus;

  @ManyToOne(() => Route, (route) => route.id)
  @JoinColumn()
  route: Route;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  fare: number; // Ticket price
}
