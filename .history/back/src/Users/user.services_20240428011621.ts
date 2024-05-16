import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Users } from './user.interface';
import { userdto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class userServices {
  constructor(private readonly userRepository: UserRepository) {}
  getUsers(page: number = 1, limit: number = 5) {
    return this.userRepository.getUserRepository(page, limit);
  }
  getUserBYid(id: string) {
    return this.userRepository.getUserRepositoryById(id);
  }
  
  createUser(user: UserEntity) {
    return this.userRepository.createRepository(user);
  }
  updateUser(id: string, update: UserEntity) {
    return this.userRepository.updateUsersRepository(id, update);
  }
  deleteUser(id: string){
    return this.userRepository.deleteUsersRepository(id);
  }
}
