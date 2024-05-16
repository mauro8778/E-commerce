import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { get } from 'http';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}
    @Post('add')
    async addOrder(@Body() orderData: { userId: string; products: { id: string }[] }) {
        const { userId, products } = orderData;
        return await this.orderService.addOrder(userId, products.map(product => product.id));
      }

      @Get(':id')
      getOrder(id:string){
        return this.orderService.getOrder(id)
      }
}
