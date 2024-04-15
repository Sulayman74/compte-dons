import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Logique de validation du token JWT dans les requêtes entrantes
    // Si le token est valide, stocker les informations de l'utilisateur dans l'objet req
    const req = context.switchToHttp().getRequest();

    // Récupérer le token JWT depuis les en-têtes de la requête
    const token = this.extractTokenFromHeader(req);


    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Vérifier et décoder le token JWT
      const decoded = await this._jwtService.verifyAsync(token, {
        secret: process.env.SECRETKEY,
      });

      // Stocker les informations de l'utilisateur dans l'objet req pour une utilisation ultérieure
      req['user'] = decoded;

    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
