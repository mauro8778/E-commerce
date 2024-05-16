import { Entity, PrimaryGeneratedColumn, Column,CreateDateColumn, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from '../Users/user.entity';
import { OrderDetailsEntity } from './orderDetail.entity';

@Entity({
  name: 'orders',
})
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.order)
  user: UserEntity;

  @CreateDateColumn()
  date: Date;

  @OneToOne(() => OrderDetailsEntity, orderDetails => orderDetails.order)
  orderDetails: OrderDetailsEntity;
}
