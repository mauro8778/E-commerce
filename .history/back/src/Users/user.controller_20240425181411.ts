import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { userServices } from './user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userServices) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  async getUserbyid() {}
  @Post('create')
  async createUsers() {}
  @Put('update')
  async updateUsers (id) {}
  @Delete('delete')
  async deleteUsers (id) {}
}
