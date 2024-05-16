import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [
    {
      id: 1,
      email: 'mauro@gmail.com',
      name: 'mauro',
      password: 'Simona8778',
      address: 'brasil 1513',
      phone: 12312365,
      country: 'argentina',
      city: 'buenos aires',
    },
    {
      id: 2,
      email: 'marina@gmail.com',
      name: 'marina',
      password: 'Simona8790',
      address: 'brasil 1513',
      phone: 12312365,
      country: 'argentina',
      city: 'buenos aires',
    },
    {
      id: 3,
      email: 'cirilo@gmail.com',
      name: 'cirilo',
      password: 'Simona8727',
      address: 'brasil 1513',
      phone: 12312365,
      country: 'argentina',
      city: 'buenos aires',
    },
  ];
  async getUserRepository() {
    return await this.users;
  }
}
