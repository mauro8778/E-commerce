import { ProductEntity } from 'src/Products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity({
  name: 'Category',
})
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToOne(() => ProductEntity, (product) => product.category)
  product: ProductEntity;
}
