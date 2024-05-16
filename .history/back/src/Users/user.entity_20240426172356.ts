import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: number;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  orders_id: number;
}
