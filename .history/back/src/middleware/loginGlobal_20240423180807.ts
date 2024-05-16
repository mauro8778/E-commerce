import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class loginGlobal implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `estas ejecutando un metodo ${req.method}, en la ruta ${req.url},a la fecha y hora ${new Date().toLocaleString()}} en Argentina`,
    );

    next();
  }
}
