import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({nullable:true})
    description: string;

    @Column({nullable:true})
    category: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    tags: string; // Comma-separated eco-friendly tags
}
