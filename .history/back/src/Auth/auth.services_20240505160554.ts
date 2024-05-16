import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'; 
import { UserRepository } from '../Users/user.repository';
import { LoginUserDto } from '../Users/loginUser.dto';
import * as bcrypt from 'bcrypt';
import { userServices } from 'src/Users/user.services';
import { UserEntity } from 'src/Users/user.entity';
import { CreateUserDto } from 'src/Users/user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class authServices {
  constructor(private readonly userRepository: UserRepository,
    private readonly userservices: userServices,
    private readonly jwtservice: JwtService
  ) {}
  getServices(): string {
    return 'estas en el servicio auth';
  }

  async SingUp(credential: Partial<CreateUserDto>) {
    const { email, password } = credential;
    
    const user = await this.userRepository.findByEmail(email);
    console.log('quetiene user',user)

    if(user) {
      throw new NotFoundException(`el mail ${email} ya existe`);
   
}
    const hashedPassword=await bcrypt.hash(credential.password,10);
    if(hashedPassword===credential.password){
      throw new NotFoundException(`no se pudo hashear el password`);
    }
    this.userRepository.createRepository({...credential, password: hashedPassword});

    return {message: 'usuario creado con exito'};
  }

  async SingIn(credential: LoginUserDto) {
    const {email, password} = credential
  
    const user= await this.userRepository.findByEmail(email);
    console.log('password',user)

    if(!user){
      throw new NotFoundException(`el mail ${email} no existe`);
    
  }

  const ValidPassword=
  await bcrypt.compare(password,(await user).password)
  
  if(!ValidPassword){
    throw new BadRequestException('credenciales incorrectas');
  }
  const userPayload = {
    id: user.id,
    email: user.email,
    isAdmin: user.IsAdmin
  }
  const token = this.jwtservice.sign(userPayload);
  return {message: 'usuario creado con exito', token}
}
}
