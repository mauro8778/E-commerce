import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userServices } from './user.services';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [userServices, UserRepository],
})
export class usersModule {}
