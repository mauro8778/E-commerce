import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { productServices } from "./product.services";

@Module({

    imports:[],
    controllers:[ProductController],
    providers:[productServices]
})

export class productModule;