import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class userServices {
  constructor(private readonly userRepository: UserRepository) {}
  getUsers(page: number = 1, limit: number = 5) {
    return this.userRepository.getUserRepository(page, limit);
  }
  getUserBYid(id: string, relations: string[] = []) {
    return this.userRepository.getUserRepositoryById(id);
  }
  
  createUser(user: any) {
    return this.userRepository.createRepository(user);
  }
  updateUser(id: string, update: CreateUserDto){
    return this.userRepository.updateUsersRepository(id, update);
  }
  deleteUser(id: string){
    return this.userRepository.deleteUsersRepository(id);
  }
}
