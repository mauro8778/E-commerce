import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './oderdto';
import { ValidationGuardsGuard } from 'src/guards/validation.guards.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/Users/user.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';


@ApiTags('Order')
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

      @ApiBearerAuth()
      @Get(':id')
       @Roles(Role.admin)
      @UseGuards(ValidationGuardsGuard,RolesGuard)
      getOrder(@Param('id') id:string,user:any) {
        return this.orderService.getOrder(id,user)
      }
}
