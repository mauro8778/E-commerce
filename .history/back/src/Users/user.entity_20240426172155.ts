@Entity({
  name: user,
})
export class Users {
  @PrimaryGeneratedColumn(uuid)
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

  @OneToMany(() => Orders, (orders) => orders.users_id)
  @Column()
  orders_id: number;
}
