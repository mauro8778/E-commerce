
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../Products/product.entity';

@Entity({
  name:'order_details',
})
export class OrderDetailsEntity {
  push(orderDetail: OrderDetailsEntity) {
      throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => OrderEntity, order => order.orderDetails)
  @JoinColumn( { name: 'order_id' } )
  order: OrderEntity;

  @ManyToMany(() => ProductEntity)
  @JoinColumn( { name: 'product_id' } )
  products: ProductEntity[];
}
