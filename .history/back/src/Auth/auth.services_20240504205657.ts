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

  async SingUp(credential: LoginUserDto) {
    const { email, password } = credential;
    
    const user = await this.userRepository.findByEmail(email);

    if(user) {
      throw new NotFoundException(`credenciales invalidas`);
   
}
    const hashedPassword=await bcrypt.hash(user.password,10);
    if(hashedPassword===user.password){
      throw new NotFoundException(`no se pudo hashear el password`);
    }
    this.userRepository.createRepository({...user, password: hashedPassword});

    return {success: 'usuario creado con exito'};
  }

  async SingIn(){
    
  }
}
