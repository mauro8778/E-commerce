import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/Users/user.repository";


@Injectable()

export class OrderRepository{

    constructor(
        private readonly userRepository:UserRepository
    ){}

    async getOrder(){
        const user = await this.userRepository.findOne({ where: { id: id } })
        const newUser= this.userRepository.create(user)
        await this.userRepository.save(newUser)

    }

    addOrder(){}
}