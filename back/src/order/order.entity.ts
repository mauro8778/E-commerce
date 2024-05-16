import { Entity, PrimaryGeneratedColumn,CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../Users/user.entity';
import { OrderDetailsEntity } from './orderDetail.entity';

@Entity({
  name: 'orders',
})
export class OrderEntity {

  /**
   * es un id unico y tiene q ser un uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  
  @ManyToOne(() => UserEntity, user =>  user.order)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  /**
   * la fecha de creacion de la orden 
   */
  @CreateDateColumn({ type: Date })
  date: Date;

  @OneToMany(() => OrderDetailsEntity, orderDetails => orderDetails.order)
  @JoinColumn({ name: 'orderDetails' })
  orderDetails: OrderDetailsEntity;
}
