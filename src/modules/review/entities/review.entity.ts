import { Bus } from 'src/modules/bus/entities/bus.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Node } from 'src/shared/node/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Review extends Node {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Bus, (bus) => bus.id)
  @JoinColumn()
  bus: Bus;

  @Column()
  rating: number; // 1-5 stars

  @Column({ nullable: true })
  comment: string;
}
