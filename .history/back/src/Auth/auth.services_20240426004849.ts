import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Users/user.repository';

@Injectable()
export class authServices {
  constructor(private readonly userRepository: UserRepository) {}
  getServices(): string {
    return 'estas en el servicio auth';
  }

  Signin() {

  }
}
