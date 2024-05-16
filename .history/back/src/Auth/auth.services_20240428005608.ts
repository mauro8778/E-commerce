import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/Users/user.repository';

@Injectable()
export class authServices {
  @InjectRepository(UserRepository)
  constructor(private readonly userRepository: UserRepository) {}
  getServices(): string {
    return 'estas en el servicio auth';
  }

  async Signin(credential: { email: string; password: string }) {
    const { email, password } = credential;
    if (!email || !password) {
      return 'Email o password incorrectos';
    }
    const user = await this.userRepository.findByEmail(email);
    if (!email || user.password !== password) {
      return 'Email o password incorrectos';
    }
    return 'inicio de secion exitoso';
  }
}
