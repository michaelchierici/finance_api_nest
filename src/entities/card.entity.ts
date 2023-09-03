import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  flag: string;

  @Column()
  number: number;

  @Column()
  limit: number;

  @ManyToOne(() => User, (user) => user.card, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.card, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  transactions: Transaction[];
}
