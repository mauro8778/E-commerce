import { UserEntity } from "src/Users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn,JoinColumn} from "typeorm";

@Entity({
    name: "order"
})

export class OrderEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @OneToMany(()=> UserEntity, user => user.id)
    @JoinColumn({name:'userid'})
    @Column()
    user_id:string

    @Column()
    Date:string;
}   