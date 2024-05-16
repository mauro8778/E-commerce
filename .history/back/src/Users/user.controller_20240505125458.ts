import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { userServices } from './user.services';
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './user.dto';
import { UpdateUserDto } from './update../guards/validation.guards.guard
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

  
  @Post('create')
  async createUsers(@Body() user: CreateUserDto) {
    return this.authservices.SingUp(user);
  }

  
  @Put('update/:id')
  @UseGuards(ValidationGuardsGuard)
   async updateUsers(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() update: UpdateUserDto
  ) {
    return this.userService.updateUser(id,update);
  }

  
  @Delete('delete/:id')
  @UseGuards(ValidationGuardsGuard)
  async deleteUsers(@Param('id',ParseUUIDPipe) id: string): Promise<string | null> {
    return this.userService.deleteUser(id);
  }
}
