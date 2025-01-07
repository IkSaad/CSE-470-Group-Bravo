import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @Column('simple-array')
  products: string[]; // Array of product names or IDs

  @Column('decimal')
  totalPrice: number;

  @Column({ default: 'Processing' }) // Default status
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  isCanceled: boolean;
}
