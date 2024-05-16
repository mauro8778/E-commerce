import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userServices } from './user.services';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [userServices],
})
export class usersModule {}
