import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Users/user.repository';

@Injectable()
export class authServices {
  constructor(private readonly userRepository: UserRepository) {}
  getServices(): string {
    return 'estas en el servicio auth';
  }

  async Signin(credential: { email: string; password: string }) {
    const { email, password } = credential;
    if (!email || !password) {
      return "credenciales obligatorias";
    }
    const user = await this.userRepository.findByEmail(email);
    if (!email || user.password !== password) {
      throw new Error('credenciales invalidas');
    }
    return 'inicio de secion exitoso';
  }
}
