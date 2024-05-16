import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './orders.entity';
import { OrderDetailEntity } from './orderDetail.entity';
import { OrdersRepository } from './orders.repository';
@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity, OrderDetailEntity])],
  controllers: [OrdersController],
  providers: [OrdersRepository,OrdersService],
})
export class OrdersModule {}
