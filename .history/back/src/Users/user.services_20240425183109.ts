import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class userServices {
  constructor(private userRepository: UserRepository) {}
  getUsers() {
    return this.userRepository.getUserRepository();
  }
  getUserBYid(id: string) {
    return this.userRepository.getUserRepositoryById(id);
  }
}
