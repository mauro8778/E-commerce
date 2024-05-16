import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './oderdto';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}
    
    @Post()
  async addOrder(@Body() orderDto: CreateOrderDto) {
    const { id, products } = orderDto;
    const order = await this.orderService.addOrder(id, products);
    return { order };
  }
      @Get(':id')
      getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
      }
}
