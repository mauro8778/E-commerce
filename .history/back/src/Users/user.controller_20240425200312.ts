import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
  async getUserbyid(@Param('id') id: string) {
    const allUsers: Users = await this.userService.getUserBYid(id);
    return {
      id: allUsers.id,
      name: allUsers.name,
      email: allUsers.email,
      address: allUsers.address,
      phone: allUsers.phone,
      country: allUsers.country,
      city: allUsers.city,
    };
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
