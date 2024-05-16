
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => OrderEntity, order => order.orderDetails)
  order: OrderEntity;

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  products: ProductEntity[];
}
