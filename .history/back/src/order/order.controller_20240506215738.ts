import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './oderdto';
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { get } from 'http';
import { UserEntity } from 'src/Users/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/Users/user.enum';
import { RolesGuard } from 'src/guards/role.guard';

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

      @Get('all')
      @Roles(Role.admin)
      @UseGuards(ValidationGuardsGuard, RolesGuard)
      GetAllOrders( user:UserEntity){
        return this.orderService.GetAllOrders(user)
      }
  @ApiBearerAuth()
      @Get(':id')
      @UseGuards(ValidationGuardsGuard)
      getOrder(@Param('id') id:string){
        return this.orderService.getOrder(id)
      }
}
