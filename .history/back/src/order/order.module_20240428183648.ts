import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderDetailsEntity } from './orderDetail.entity';

@Module({
  imports: [OrderEntity,OrderDetailsEntity],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
