import { ProductEntity } from '../Products/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity({
  name: 'category',
})
export class CategoryEntity {
  /**
   * Primary key uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
/**
 * es un nombre tiene que ser unico de largo 50 caracteres
 * de tipo varchar y no puede ser nulo
 */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => ProductEntity, product => product.category)
  @JoinColumn()
  products: ProductEntity[];

}
