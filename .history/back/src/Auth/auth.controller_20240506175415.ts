import { Body, Controller, Get, Post } from '@nestjs/common';
import { authServices } from './auth.services';
import { UserEntity } from '../Users/user.entity';
import { CreateUserDto } from '../Users/user.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class authController {
  constructor(private readonly authService: authServices) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return await this.authService.SingUp(user);
  }
  @Post('signin')
  async signin(@Body() credential: loginUserDto) {
    return this.authService.SingIn(credential);
  }
}
