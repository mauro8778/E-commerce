import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Users } from './user.interface';
import { userdto } from './user.dto';

@Injectable()
export class userServices {
  constructor(private userRepository: UserRepository) {}
  getUsers(page: number = 1, limit: number = 5) {
    return this.userRepository.getUserRepository(page, limit);
  }
  getUserBYid(id: string) {
    return this.userRepository.getUserRepositoryById(id);
  }
  createUser(user: Partial<userdto>) {
    return this.userRepository.createRepository(user);
  }
  updateUser(id: string, update: Partial<userdto>): Promise<Users | null> {
    return this.userRepository.updateUsersRepository(id, update);
  }
  deleteUser(id: string): Promise<string | null> {
    return this.userRepository.deleteUsersRepository(id);
  }
}
