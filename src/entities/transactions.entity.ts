import { Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

type TransactionType = 'income' | 'outcome';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column('decimal', { precision: 5, scale: 2 })
  @Min(0.1)
  value: number;
  @Column()
  category: string;
  @Column()
  type: TransactionType;
  @CreateDateColumn()
  date: Date;
}
