import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // Logique de validation du token JWT dans les requêtes entrantes
    // Si le token est valide, stocker les informations de l'utilisateur dans l'objet req
    const req = context.switchToHttp().getRequest();

    // Récupérer le token JWT depuis les en-têtes de la requête
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return false;
    }

    try {
      // Vérifier et décoder le token JWT
      const decoded = this._jwtService.verify(token);

      // Stocker les informations de l'utilisateur dans l'objet req pour une utilisation ultérieure
      req.user = decoded;

      return true;
    } catch (error) {
      return false;
    }
  }
}
