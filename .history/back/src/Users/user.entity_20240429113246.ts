
import { OrderEntity } from 'src/order/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,JoinColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  password: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @OneToMany(()=>OrderEntity, (order)=>order.user)
  @JoinColumn({name:"id"})
  order: OrderEntity[];
}
