import { Injectable } from '@nestjs/common';

@Injectable()
export class authServices {
  getServices(): string {
    return 'estas en el servicio auth';
  }
}
