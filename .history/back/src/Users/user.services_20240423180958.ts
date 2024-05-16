import { Injectable } from '@nestjs/common';

@Injectable()
export class userServices {
  getUsers(): string {
    return 'estas en el servicio de usuarios ';
  }
}
