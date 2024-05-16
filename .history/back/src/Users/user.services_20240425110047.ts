import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class userServices {
  constructor(private userRepository: UserRepository) {}
  getUsers(){
    return this.userRepository.getUserRepository();
  }
}
