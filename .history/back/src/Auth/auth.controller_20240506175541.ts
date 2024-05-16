import { Body, Controller, Get, Post } from '@nestjs/common';
import { authServices } from './auth.services';
import { CreateUserDto } from '../Users/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/Users/loginUser.dto';


@ApiTags('Auth')
@Controller('auth')
export class authController {
  constructor(private readonly authService: authServices) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto) {
    return await this.authService.SingUp(user);
  }
  @Post('signin')
  async signin(@Body() credential: LoginUserDto) {
    return this.authService.SingIn(credential);
  }
}
