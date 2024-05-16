import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { userServices } from './user.services';
import { Users } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userServices) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  async getUserbyid(id: string) {
    return this.userService.getUserBYid(id);
  }
  @Post('create')
  async createUsers(@Body() user: Users) {
    return this.userService.createUser(user);
  }

  @Put('update')
  async updateUsers() {}

  @Delete('delete')
  async deleteUsers() {}
}
