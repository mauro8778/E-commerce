import { Controller, Get } from '@nestjs/common';
import { userServices } from './user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userServices) {}

  @Get()
  getUsers(): string {
    return this.userService.getUsers();
  }
}
