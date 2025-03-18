import { Node } from 'src/shared/node/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Node {
  @Column({ type: 'varchar', length: 40 })
  username: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'operator'],
    default: 'user',
  })
  role: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  confirmationToken: string | null;

  @Column({ nullable: true })
  resetPwdToken: string | null;

  @Column({ default: false })
  isConfirmed: boolean;
}
