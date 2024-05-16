
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../Products/product.entity';
import { PriceTransformer } from '../priceTransformer';
@Entity({
  name:'order_details',
})
export class OrderDetailsEntity {
  orderDetail: ProductEntity;
  push(orderDetail: OrderDetailsEntity) {
      throw new Error('Method not implemented.');
  }
  /**
   * es un id unico y tiene q ser un uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * el total de la compra tiene q ser un numero positivo 
   */
  @Column({ type:'numeric' ,  name: 'total_price', precision: 10, scale: 2, 
  nullable:true ,transformer: new PriceTransformer()})
  TotalPrice: number;

  
  @ManyToOne(() => OrderEntity, order => order.orderDetails)
  @JoinColumn( { name: 'order_id' } )
  order: OrderEntity;

  @ManyToMany(() => ProductEntity)
  @JoinTable( { name: 'order_details_products',
   joinColumn: { name: 'productId' },
    inverseJoinColumn: { name: 'orderDetailId' } } )
  products: ProductEntity[];
}
