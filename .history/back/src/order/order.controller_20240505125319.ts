import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './oderdto';
import { ValidationGuardsGuard } from 'src/guards/validation.guards.guard';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}
    
    @Post()
    @UseGuards(ValidationGuardsGuard)
  async addOrder(@Body() orderDto: CreateOrderDto) {
    const { id, products } = orderDto;
    const order = await this.orderService.addOrder(id, products);
    return { order };
  }
      @Get(':id')
      @UseGuards(ValidationGuardsGuard)
      getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
      }
}
