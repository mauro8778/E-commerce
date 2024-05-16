import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userServices } from './user.services';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from 'src/order/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,OrderEntity])],
  controllers: [UserController],
  providers: [UserRepository, userServices],
  exports: [UserRepository],
})
export class usersModule {}
