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
import { UpdateUserDto } from './update.user.dto';
import { authServices } from '../Auth/auth.services';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from './user.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: userServices,
    private readonly authservices: authServices
  ) {}

  @ApiBearerAuth()
  @Get()
@Roles(Role.admin)
@UseGuards(ValidationGuardsGuard,RolesGuard)
 getUsers(@Query('page') page: number = 1, 
 @Query('limit') limit: number = 5) {
    return this.userService.getUsers(page, limit);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(ValidationGuardsGuard)
  async getUserbyid(@Param('id',ParseUUIDPipe)
   id: string,relations: string[] = []) {
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

  @ApiBearerAuth()
  @Put('update/:id')
  @UseGuards(ValidationGuardsGuard)
   async updateUsers(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() update: UpdateUserDto
  ) {
    return this.userService.updateUser(id,update);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  @UseGuards(ValidationGuardsGuard)
  async deleteUsers(@Param('id',ParseUUIDPipe) id: string): Promise<string | null> {
    return this.userService.deleteUser(id);
  }
}
