import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './user.interface';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { productDto } from 'src/Products/product.dto';
import { promises } from 'dns';


@Injectable()
export class UserRepository {
constructor(
@InjectRepository(UserEntity)
private readonly userRepository: Repository<UserEntity>
){}
  async getUserRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    
      const user = await this.userRepository.find({ 
      skip: start,
      take: limit, 
      select: ['id', 'name', 'email', 'address', 'phone', 'country', 'city','IsAdmin'],
      relations:['order']
     
  });

  if(!user){
    throw new NotFoundException('no se encontro el usuario')
  }
  return user;

}
  async getUserRepositoryById(id: string, relations: string[] = []) {
    const user= await this.userRepository.findOne(
      { where: { id },
      relations:['order'],
  select:{
    order: {
      id: true,
      date: true,
    }
  }});
  if(!user)
    throw new NotFoundException(`no se encontro el usuario con id ${id}`)
  return user;
  };
  async createRepository(userRepository: Partial<UserEntity>){
const newUser = this.userRepository.create(userRepository);
    return await this.userRepository.save(newUser);
  }
  async updateUsersRepository(id: string, update: Partial<UserEntity>) {
    const updateUser = await this.userRepository.findOne( { where: { id } } );
    if (!updateUser) {
      
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
    updateUser.name= update.name;
    updateUser.email= update.email;
    updateUser.password= update.password;
    updateUser.address= update.address;
    updateUser.phone= update.phone;
    updateUser.country= update.country;
    updateUser.city= update.city;
    
   await this.userRepository.save(updateUser);
    return 'usuario actualizado';
  }
  async deleteUsersRepository(id: string) {
    const deleteUser = await this.userRepository.findOne({ where: { id } })
    if (!deleteUser) {
      throw new NotFoundException(`no se encontro el usuario con id ${id}`);
    }
     await this.userRepository.delete(id);
      return id
  }
  async findByEmail(email: string):Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
