import { Injectable } from '@nestjs/common';

@Injectable()
export class productServices {
  getproduct(): string {
    return 'estas en el servicio de productos';
  }
}
