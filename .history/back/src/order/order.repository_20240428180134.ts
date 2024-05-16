import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/Users/user.repository";


@Injectable()

export class OrderRepository{

    constructor(
        private readonly userRepository:UserRepository
    ){}

    getOrder(){
        const user=await this.userRepository.findOne({ where: { id: id } })
    }

    addOrder(){}
}