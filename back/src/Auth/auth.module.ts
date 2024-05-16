import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { authServices } from './auth.services';
import { UserRepository } from '../Users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../Users/user.entity';
import { userServices } from '../Users/user.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [authController],
  providers: [UserRepository,authServices,userServices],
})
export class authModule {}
