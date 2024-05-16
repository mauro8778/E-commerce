import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { userServices } from './user.services';
import { ValidationGuardsGuard } from '../Auth/validation.guards.guard';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './user.dto';
import { UpdateUserDto } from './update.user.dto';
import { authServices } from 'src/Auth/auth.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: userServices,
    private readonly authservices: authServices
  ) {}

  
  @Get()
@UseGuards(ValidationGuardsGuard)
 getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.userService.getUsers(page, limit);
  }

  
  @Get(':id')
  @UseGuards(ValidationGuardsGuard)
  async getUserbyid(@Param('id',ParseUUIDPipe) id: string,relations: string[] = []) {
    const allUsers: Partial<UserEntity> = await this.userService.getUserBYid(id);
    return {
      id: allUsers.id,
      name: allUsers.name,
      email: allUsers.email,
      address: allUsers.address,
      phone: allUsers.phone,
      country: allUsers.country,
      city: allUsers.city,
      relations:allUsers.order
    };
  }

  @HttpCode(201)
  @Post('create')
  async createUsers(@Body() user: CreateUserDto) {
    return this.authservices.SingUp(user);
  }

  @HttpCode(200)
  @Put('update/:id')
  @UseGuards(ValidationGuardsGuard)
   async updateUsers(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() update: UpdateUserDto
  ) {
    return this.userService.updateUser(id,update);
  }

  @HttpCode(200)
  @Delete('delete/:id')
  
  
  async deleteUsers(@Param('id',ParseUUIDPipe) id: string): Promise<string | null> {
    return this.userService.deleteUser(id);
  }
}
