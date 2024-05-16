import { Injectable } from '@nestjs/common';

@Injectable()
export class productServices {
  getproduct(): string {
    return 'this is product service';
  }
}
