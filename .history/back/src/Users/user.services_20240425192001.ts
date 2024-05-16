import { Body, Injectable } from '@nestjs/common';
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
  createUser(@Body() user: Users) {
    return this.userRepository.createRepository(user);
  }
}
