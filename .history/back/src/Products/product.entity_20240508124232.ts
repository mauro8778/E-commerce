import { PriceTransformer } from '../priceTransformer';
import { CategoryEntity } from '../category/category.entity';
import { OrderDetailsEntity } from '../order/orderDetail.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  ValueTransformer,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class ProductEntity {
  /**
  es el id y tiene que ser un uuid
  */
@PrimaryGeneratedColumn('uuid')
id: string;
 /**
  es el name tiene q ser un string de 50 caracteres y no nulo
  */
@Column({ length: 50, nullable: false })
name: string;
/**
 * es el description tiene q ser un string de 100 caracteres y no nulo
 */
@Column({ type: 'text', nullable: false })
description: string;

/**
 * es el price tiene q ser un numero y no nulo
 */
@Column({ type:'numeric' ,  precision: 10, scale: 2, nullable:true ,
transformer: new PriceTransformer()})
price: number;

/**
 * es el stock tiene q ser un numero y no nulo
 */
@Column({ type: 'int', nullable: false })
stock: number;

/**
 * es el imgUrl tiene q ser un string de 200 caracteres y no nulo
 */
@Column({ type: 'text',nullable: false ,default:"https://picsum.photos/200" })
imgUrl: string;

@ManyToOne(() => CategoryEntity, category => category.products)
@JoinColumn({ name: 'categoryId' })
category: CategoryEntity;

@ManyToMany(() => OrderDetailsEntity)
@JoinColumn()
order: OrderDetailsEntity[];
}
