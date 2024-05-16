import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { OrdersEntity } from './orders.entity';
import { ProductEntity } from 'src/Products/product.entity';

@Entity()
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => OrdersEntity, (order) => order.orderDetails)
  order: OrdersEntity;

  @ManyToMany(() => ProductEntity, (product) => product.orderDetails)
  products: ProductEntity[];
}
