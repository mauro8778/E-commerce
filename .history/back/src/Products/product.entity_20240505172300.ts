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
import PriceTransformer from './PriceTransformer';


export class PriceTransformer implements ValueTransformer{

  to(data:number):number{
  return data;
}
from (data:string):number{
  return parseFloat(data);
}
}


@Entity({
  name: 'products',
})
export class ProductEntity {
  
@PrimaryGeneratedColumn('uuid')
id: string;

@Column({ length: 50, nullable: false })
name: string;

@Column({ type: 'text', nullable: false })
description: string;

@Column({ type:'numeric' ,  precision: 10, scale: 2, nullable:true ,transformer: new PriceTransformer()})
price: number;

@Column({ type: 'int', nullable: false })
stock: number;


@Column({ type: 'text',nullable: false ,default:"https://picsum.photos/200" })
imgUrl: string;

@ManyToOne(() => CategoryEntity, category => category.products)
@JoinColumn({ name: 'categoryId' })
category: CategoryEntity;

@ManyToMany(() => OrderDetailsEntity)
@JoinColumn()
order: OrderDetailsEntity[];
}
