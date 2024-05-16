import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userServices } from './user.services';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [userServices, UserRepository],
})
export class usersModule {}
