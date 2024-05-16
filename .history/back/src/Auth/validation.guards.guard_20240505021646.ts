import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class ValidationGuardsGuard implements CanActivate {
  constructor(private readonly jwtservice: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token || !token.startsWith('bearer')) {
     throw new UnauthorizedException('se necesita token')
    }
    try {
      const secret=process.env.JWT_SECRET;
      const payload=this.jwtservice.verify(token,{secret});
      payload.iat= new Date(payload.iat * 1000 );
      payload.exp= new Date(payload.exp * 1000 );
      payload.role=['admin'];
      request.user=payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('token invalido')
      
    }
  }
}
