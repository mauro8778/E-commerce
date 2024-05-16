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
  async getUsers() {
    const AllUsers: Users = await this.userService.getUsers();
    return {
      id: AllUsers.id,
      name: AllUsers.name,
      email: AllUsers.email,
      address: AllUsers.address,
      phone: AllUsers.phone,
      country: AllUsers.country,
      city: AllUsers.city,
    };
  }
  @Get(':id')
  async getUserbyid(@Param('id') id: string) {
    const allUsersbyid: Users = await this.userService.getUserBYid(id);
    return {
      id: allUsersbyid.id,
      name: allUsersbyid.name,
      email: allUsersbyid.email,
      address: allUsersbyid.address,
      phone: allUsersbyid.phone,
      country: allUsersbyid.country,
      city: allUsersbyid.city,
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
