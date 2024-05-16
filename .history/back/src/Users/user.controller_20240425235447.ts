import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { userServices } from './user.services';
import { Users } from './user.interface';
import { userdto } from './user.dto';

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
  @UsePipes(new ValidationPipe())
  async createUsers(@Body() user: userdto) {
    return this.userService.createUser(user);
  }

  @HttpCode(200)
  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  async updateUsers(
    @Param('id') id: string,
    @Body() update: userdto,
  ): Promise<userdto> {
    return this.userService.updateUser(id, update);
  }

  @Delete('delete/:id')
  async deleteUsers(@Param('id') id: string): Promise<string | null> {
    return this.userService.deleteUser(id);
  }
}
