import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { userServices } from './user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userServices) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @Get()
  async getUserbyid() {}
  @Post()
  async createusers() {}
  @Put()
  async updateusers() {}
  @Delete()
  async deleteusers() {}
}
