import { Injectable } from '@nestjs/common';

@Injectable()
export class userServices {
  getUsers(): string {
    return 'this is user service';
  }
}
