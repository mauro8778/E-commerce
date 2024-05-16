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
    const AllUserID: Users = await this.userService.getUserBYid(id);
    return {
      id: AllUserID.id,
      name: AllUserID.name,
      email: AllUserID.email,
      adress: AllUserID.address,
      phone: AllUserID.phone,
      country: AllUserID.country,
      city: AllUserID.city,
    };
  }
  @Post('create')
  async createUsers(@Body() user: Users) {
    const newUser: Users = await this.userService.createUser(user)
    return newUser;
  }

  @Put('update')
  async updateUsers() {}

  @Delete('delete')
  async deleteUsers() {}
}
