import { UserEntity } from 'src/Users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { OrderDetailEntity } from './orderDetail.entity';

@Entity()
export class OrdersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column({ nullable: true })
  date: Date;

  @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity;
}
