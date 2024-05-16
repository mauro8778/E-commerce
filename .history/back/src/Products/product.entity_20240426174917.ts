import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('integer')
  stock: number;

  @Column({ nullable: true })
  imgUrl: string;

  @Column()
  category_id: string;
}
