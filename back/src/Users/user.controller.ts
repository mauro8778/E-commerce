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
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userServices } from './user.services';
import { authServices } from 'src/Auth/auth.services';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './user.enum';
import { ValidationGuardsGuard } from 'src/guards/validation.guards.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { UpdateUserDto } from './update.user.dto';
import { UserEntity } from './user.entity';


@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: userServices,
    private readonly authservices: authServices
  ) { }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.admin)
  @UseGuards(ValidationGuardsGuard, RolesGuard)
  @ApiQuery({ name: 'limit', required: false, type: Number, description: "50" })
  @ApiQuery({ name: 'page', required: false, type: Number, description: "1" })
  getUsers(@Query('page') page: number = 1,
    @Query('limit') limit: number = 5) {
    return this.userService.getUsers(page, limit);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(ValidationGuardsGuard)
  async getUserbyid(@Param('id', ParseUUIDPipe)
  id: string, relations: string[] = []) {
    await this.userService.getUserBYid(id, relations);



  }

  @Post('admin/:id')
  async admin(@Param('id') id: string): Promise<UserEntity> {
    const admins = await this.userService.admin(id)
    return admins

  }

  @ApiBearerAuth()
  @Put('update/:id')
  @UseGuards(ValidationGuardsGuard)
  async updateUsers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() update: UpdateUserDto
  ) {
    return this.userService.updateUser(id, update);
  }

  @ApiBearerAuth()
  @Delete('delete/:id')
  @UseGuards(ValidationGuardsGuard)
  async deleteUsers(@Param('id', ParseUUIDPipe) id: string): Promise<string | null> {
    return this.userService.deleteUser(id);
  }


}
