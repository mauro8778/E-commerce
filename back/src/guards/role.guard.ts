import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../Users/user.enum';
  
@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	
	canActivate(context: ExecutionContext): boolean {
		
		const requiredRoles = 
			this.reflector.getAllAndOverride<Role[]>('roles', [
				context.getHandler(),
				context.getClass(),
				
			])
		
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		
		
		const hasRole = () =>
			requiredRoles.some((role) =>
				user?.role === role || user?.role === Role.admin);
		
		const valid = user && user.role && hasRole();
		
		
		if (!valid) {
			throw new ForbiddenException(
				'No tiene permisos para acceder a esta ruta',
			);
		}
		
		return valid;
	}
}