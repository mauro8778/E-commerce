import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Users } from './user.interface';

@Injectable()
export class userServices {
  constructor(private userRepository: UserRepository) {}
  getUsers() {
    return this.userRepository.getUserRepository();
  }
  getUserBYid(id: string) {
    return this.userRepository.getUserRepositoryById(id);
  }
  createUser(user: Users) {
    return this.userRepository.createRepository(user);
  }
  updateUser(id: string) {
    return this.userRepository.updateUsersRepository(id);
  }
  deleteUser(id: string) {
    return this.userRepository.deleteUsersRepository(id);
  }
}
