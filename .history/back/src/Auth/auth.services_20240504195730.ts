import { Injectable, NotFoundException } from '@nestjs/common'; 
import { UserRepository } from '../Users/user.repository';
import { LoginUserDto } from '../Users/loginUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class authServices {
  constructor(private readonly userRepository: UserRepository) {}
  getServices(): string {
    return 'estas en el servicio auth';
  }

  async Signin(credential: LoginUserDto) {
    const { email, password } = credential;
    if (!email) {
      throw new NotFoundException(`email: ${email} o password: ${password} incorrectos`);
    }
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new NotFoundException(`email: ${email} o password: ${password} incorrectos`);
    }
    if ( !password|| user.password !== password) {
      throw new NotFoundException(`email: ${email} o password: ${password} incorrectos`);
    }
    const hashedPassword=await bcrypt.hash(user.password,10)
    return 'inicio de secion exitoso';
  }

  async SingUp(){
    
  }
}
