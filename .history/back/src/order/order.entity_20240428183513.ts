import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderDetailsEntity } from './order-details.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, user => user.orders)
  user: UserEntity;

  @Column()
  date: string;

  @OneToOne(() => OrderDetailsEntity, orderDetails => orderDetails.order)
  orderDetails: OrderDetailsEntity;
}
