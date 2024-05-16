import { Body, Controller, Get, Post } from '@nestjs/common';
import { authServices } from './auth.services';
import { LoginUserDto } from '../Users/loginUser.dto';
import { UserEntity } from 'src/Users/user.entity';

@Controller('auth')
export class authController {
  constructor(private readonly authService: authServices) {}

  @Get()
  getServices(): string {
    return this.authService.getServices();
  }
  @Post('signin')
  async signin(@Body() credential: UserEntity) {
    return this.authService.SingIn(credential);
  }
}
