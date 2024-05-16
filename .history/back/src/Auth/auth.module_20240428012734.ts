import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { authServices } from './auth.services';
import { UserRepository } from 'src/Users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [authController],
  providers: [UserRepository,authServices],
})
export class authModule {}
