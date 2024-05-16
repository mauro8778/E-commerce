import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './oderdto';
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
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
    console.log('ID de usuario:', id);
    console.log('Productos:', products);
    const order = await this.orderService.addOrder(id, products);
    
    return { order };
  }
  @ApiBearerAuth()
      @Get(':id')
      @UseGuards(ValidationGuardsGuard)
      getOrder(@Param('id') id:string){
        if(!id){
          throw new NotFoundException('no se encontraron ordenes de compra')
        }
        return this.orderService.getOrder(id)
      }
}
