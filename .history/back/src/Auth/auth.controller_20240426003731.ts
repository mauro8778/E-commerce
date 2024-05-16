import { Controller, Get, Post } from '@nestjs/common';
import { authServices } from './auth.services';

@Controller('auth')
export class authController {
  constructor(private readonly authService: authServices) {}

  @Get()
  getServices(): string {
    return this.authService.getServices();
  }
  @Post('signin')
  Signin() {}
}
