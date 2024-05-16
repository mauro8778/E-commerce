import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { authServices } from './auth.services';
import { UserRepository } from 'src/Users/user.repository';

@Module({
  imports: [],
  controllers: [authController],
  providers: [UserRepository,authServices],
})
export class authModule {}
