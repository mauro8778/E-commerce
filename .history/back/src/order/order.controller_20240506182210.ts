import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './oderdto';
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/Users/user.enum';
import { RolesGuard } from 'src/guards/role.guard';

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
      @Roles(Role.admin)
      @UseGuards(ValidationGuardsGuard,RolesGuard)
      getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
      }
}
