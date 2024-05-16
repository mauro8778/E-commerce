import { CategoryEntity } from 'src/category/category.entity';
import { OrderDetailsEntity } from 'src/order/orderDetail.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class ProductEntity {@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ length: 50, nullable: false })
name: string;

@Column({ type: 'text', nullable: false })
description: string;

@Column('decimal', { precision: 10, scale: 2, nullable: false })
price: number;

@Column({ nullable: false })
stock: number;


@Column({ nullable: true })
imgUrl: string;

@ManyToOne(() => CategoryEntity, category => category.products)
@JoinTable({ name: 'category_product' })
category: CategoryEntity;

@ManyToMany(() => OrderDetailsEntity)
@JoinTable()
order: OrderDetailsEntity[];
}
