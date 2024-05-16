import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './oderdto';
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { get } from 'http';

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}
    
    @ApiBearerAuth()
    @Post()
    @UseGuards(ValidationGuardsGuard)
  async addOrder(@Body() orderDto: CreateOrderDto) {
    const { id, products } = orderDto;
    const order = await this.orderService.addOrder(id, products);
    return { order };
  }

      @Get()
      GetAllOrders(){
        return this.orderService.GetAllOrders()
      }
  @ApiBearerAuth()
      @Get(':id')
      @UseGuards(ValidationGuardsGuard)
      getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
      }
}
