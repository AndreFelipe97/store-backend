import { Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  brand: string;
  @Column('decimal', { precision: 5, scale: 2 })
  @Min(0.1)
  price: number;
  @Column()
  @Min(0)
  amount: number;
  @Column()
  barcode: string;
}
