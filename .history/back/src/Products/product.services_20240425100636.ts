import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/Users/user.repository';

@Injectable()
export class productServices {
  constructor(private userRepository: UserRepository) {}
  getproduct() {
    return this.userRepository.getUserRepository();
  }
}
