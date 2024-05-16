import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { userServices } from './user.services';
import { ValidationGuardsGuard } from '../guards/validation.guards.guard';
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
    if( Param.id === undefined){
      throw new NotFoundException(`no se encontro usuario`)
    }
    return await this.userService.getUserBYid(id);
    
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
