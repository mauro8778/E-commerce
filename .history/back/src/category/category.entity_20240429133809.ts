import { ProductEntity } from 'src/Products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({
  name: 'category',
})
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => ProductEntity, product => product.category)
  @JoinColumn()
  products: ProductEntity[];

}
