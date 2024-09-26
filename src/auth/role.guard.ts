// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
       
        if (!requiredRoles || requiredRoles.length === 0) {
            return true; 
        }

        const { user } = context.switchToHttp().getRequest();
    
        const hasRequiredRole = requiredRoles.some((role) => user.role.includes(role));
        if (!hasRequiredRole) {
            throw new HttpException(user.role + ' roles not allowed', HttpStatus.FORBIDDEN);
        }

        return true;
    }
}
