import { CategoryEntity } from 'src/category/category.entity';
import { OrderDetailEntity } from 'src/orders/orderDetail.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: true })
  imgUrl: string;

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  category_id: category;

  @ManyToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.products)
  @JoinTable()
  orderDetails: OrderDetailEntity[];
}
