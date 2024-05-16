import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userServices } from './user.services';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from '../order/order.entity';
import { authServices } from 'src/Auth/auth.services';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,OrderEntity])],
  controllers: [UserController],
  providers: [UserRepository, userServices,authServices],
  exports: [UserRepository],
})
export class usersModule {}
