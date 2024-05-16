

import { OrderEntity } from '../order/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,JoinColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  /**
   * este es el id tiene q ser un uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;
 /**
   * este es el name tiene q ser un string con un maximo de 50 caracteres
   */
  @Column({ length: 50, nullable: false })
  name: string;

   /**
   * este es el email tiene q ser un string con un maximo de 50 caracteres
   */

  @Column({ length: 50, nullable: false })
  email: string;

  /**
   * este es el password tiene q ser un string con un maximo de 225 caracteres
   */

  @Column({ length: 255, nullable: false })
  password: string;
  
  /**
   * este es el phone tiene q ser un number
   */
  @Column({ nullable: true })
  phone: number;

  /**
   * este es el country tiene q ser un string con un maximo de 50 caracteres
   */
  @Column({ length: 50, nullable: true })
  country: string;

  /**
   * este es el adress tiene q ser un string 
   */
  @Column({ nullable: true })
  address: string;

  /**
   * este es el city tiene q ser un string con un maximo de 50 caracteres
   */
  @Column({ length: 50, nullable: true })
  city: string;


  @Column({
    default: false,
  })
  IsAdmin:boolean;

  @OneToMany(()=>OrderEntity, (order)=>order.user)
  @JoinColumn({name:"orders"})
  order: OrderEntity[];
}
