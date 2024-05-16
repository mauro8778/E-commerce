import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class userServices {
  constructor(private userRepository: UserRepository) {}
  getUsers() :any {
    return this.userRepository.getUserRepository();
  }
}
