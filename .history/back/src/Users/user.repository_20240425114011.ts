import { Injectable } from '@nestjs/common';
type Users=
  {
  id: string;
  email: string;
  name: string;
  password: string;
address: string
phone: string
country?: string | undefined
city?: string | undefined
}

@Injectable()
export class UserRepository {
  private users = Users[] =[
    {
      id: '1',
      email: 'mauro@gmail.com',
      name: 'mauro',
      password: 'Simona8778',
      address: 'brasil 1513',
      phone: '12312365',
      country: 'argentina',
      city: 'buenos aires',
    },
    {
      id: '2',
      email: 'marina@gmail.com',
      name: 'marina',
      password: 'Simona8790',
      address: 'brasil 1513',
      phone: '12312365',
      country: 'argentina',
      city: 'buenos aires',
    },
    {
      id: '3',
      email: 'cirilo@gmail.com',
      name: 'cirilo',
      password: 'Simona8727',
      address: 'brasil 1513',
      phone: '12312365',
      country: 'argentina',
      city: 'buenos aires',
    },
  ];
  async getUserRepository() {
    return this.users;
  }
}
