import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/Products/product.entity";
import { ProductRepository } from "src/Products/product.repository";
import { UserEntity } from "src/Users/user.entity";
import { UserRepository } from "src/Users/user.repository";
import { OrderEntity } from "./order.entity";


@Injectable()

export class OrderRepository{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:UserRepository,
        @InjectRepository(ProductEntity)
        private readonly productRepository:ProductRepository,
        @InjectRepository(OrderEntity)
        private readonly orderRepository:OrderRepository
    ){}

    async getOrder(){
        const user = await this.userRepository.findOne({ where: { id: id } })
        const newUser= this.userRepository.create(user)
        await this.userRepository.save(newUser)

        const product= await this.productRepository.findOne({ where: { id: id } })

    }

    addOrder(){}
}