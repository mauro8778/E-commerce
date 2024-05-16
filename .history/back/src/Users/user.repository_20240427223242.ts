import { Injectable } from '@nestjs/common';
import { Users } from './user.interface';
import { userdto } from './user.dto';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  private users: Users[] = [
    {
      id: '1',
      email: 'user1@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main Street',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
    },
    {
      id: '2',
      email: 'user2@example.com',
      name: 'Jane Smith',
      password: 'securepass',
      address: '456 Elm Street',
      phone: '456-789-0123',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: '3',
      email: 'user3@example.com',
      name: 'Alice Johnson',
      password: 'pass1234',
      address: '789 Oak Street',
      phone: '789-012-3456',
      country: 'UK',
      city: 'London',
    },
    {
      id: '4',
      email: 'user4@example.com',
      name: 'Bob Brown',
      password: 'mysecretpassword',
      address: '321 Pine Street',
      phone: '321-654-9870',
      country: 'Australia',
      city: 'Sydney',
    },
    {
      id: '5',
      email: 'user5@example.com',
      name: 'Ella Davis',
      password: 'ellapass',
      address: '654 Cedar Street',
      phone: '654-987-3210',
      country: 'France',
      city: 'Paris',
    },
    {
      id: '6',
      email: 'user6@example.com',
      name: 'Mike Wilson',
      password: 'mikewpass',
      address: '987 Maple Street',
      phone: '987-321-6540',
      country: 'Germany',
      city: 'Berlin',
    },
    {
      id: '7',
      email: 'user7@example.com',
      name: 'Sarah Lee',
      password: 'sarah123',
      address: '147 Walnut Street',
      phone: '147-258-3690',
      country: 'Spain',
      city: 'Madrid',
    },
    {
      id: '8',
      email: 'user8@example.com',
      name: 'Chris Evans',
      password: 'cevanspass',
      address: '258 Birch Street',
      phone: '258-369-1470',
      country: 'Italy',
      city: 'Rome',
    },
    {
      id: '9',
      email: 'user9@example.com',
      name: 'Laura Brown',
      password: 'laurabpass',
      address: '369 Oak Street',
      phone: '369-147-2580',
      country: 'Japan',
      city: 'Tokyo',
    },
    {
      id: '10',
      email: 'user10@example.com',
      name: 'Alex Johnson',
      password: 'alexpass123',
      address: '741 Elm Street',
      phone: '741-852-9630',
      country: 'Brazil',
      city: 'Rio de Janeiro',
    },
  ];
  async getUserRepository(page: number = 1, limit: number = 5) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.users.slice(start, end);
  }
  async getUserRepositoryById(id: string) {
    return this.users.find((user) => user.id == id);
  }
  async createRepository(user: Partial<UserEntity>) {
return await this.userRepository.save(user);
  }
  async updateUsersRepository(id: string, update: userdto): Promise<any> {
    const updateUser = await this.users.findIndex((user) => user.id == id);
    if (updateUser !== -1) {
      this.users[updateUser] = { ...update, id };
      return id;
    }
    return null;
  }
  async deleteUsersRepository(id: string) {
    const deleteUser = await this.users.findIndex((user) => user.id == id);
    if (deleteUser !== -1) {
      const Delete = await this.users.splice(deleteUser, 1)[0];
      return Delete.id;
    }
    return null;
  }
  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
