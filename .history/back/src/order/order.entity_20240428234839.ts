import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from '../Users/user.entity';
import { OrderDetailsEntity } from './orderDetail.entity';

@Entity({
  name: 'order',
})
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.order)
  user: UserEntity;

  @Column()
  date: string;

  @OneToOne(() => OrderDetailsEntity, orderDetails => orderDetails.order)
  orderDetails: OrderDetailsEntity;
}
