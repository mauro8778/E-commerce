import { Injectable } from '@nestjs/common';

@Injectable()
export class authServices {
  getServices(): string {
    return 'this is auth services';
  }
}
