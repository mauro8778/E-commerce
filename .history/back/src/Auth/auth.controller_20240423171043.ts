import { Controller, Get } from '@nestjs/common';
import { authServices } from './auth.services';

@Controller('auth')
export class authController {
  constructor(private readonly authService: authServices) {}

  @Get()
  getServices(): string {
    return this.authService.getServices();
  }
}
