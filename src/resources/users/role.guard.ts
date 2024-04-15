// role.guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import {Role} from "@prisma/client"

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());

    if (!roles) {
      return true; // Si aucun rôle n'est défini, autoriser l'accès
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Supposons que vous avez un middleware d'authentification qui place l'utilisateur dans la requête

    // Vérifiez si le rôle de l'utilisateur correspond à l'un des rôles autorisés
    return roles.some(role => user.role === role);
  }
}
