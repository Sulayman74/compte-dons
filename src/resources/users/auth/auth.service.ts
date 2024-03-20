import * as argon2 from 'argon2';

import { BadRequestException, Injectable } from '@nestjs/common';
import { SignIn, SignUp } from '../dto';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../entities/user.entity';

// AuthService pour la gestion de l'authentification et des tokens JWT
@Injectable()
export class AuthService {
  constructor(
    private readonly _prismaService: PrismaService,
    private _jwtService: JwtService,
  ) {}

  async signIn(credentials: SignIn): Promise<string> {
    try {
      const user = await this._prismaService.user.findUniqueOrThrow({
        where: { email: credentials.email },
      });
      // Logique de connexion
      // Si les identifiants sont valides, générer un token JWT et le retourner

      if (
        !user ||
        !(await this.validatePassword(credentials.password, user.password))
      ) {
        throw new BadRequestException('Identifiants incorrects');
      }

      // Générer un token JWT avec les informations de l'utilisateur
      const token = this._jwtService.sign({
        sub: user.id,
        firstname: user.firstname,
      });

      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signUp(userData: SignUp): Promise<User> {
    const existingUser = await this._prismaService.user.findUniqueOrThrow({
      where: { email: userData.email },
    });
    if (!existingUser) {
      try {
        const newUser = await this._prismaService.user.create({
          data: userData,
        });
        return newUser;
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else return;
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await argon2.verify(hashedPassword, plainPassword);
    } catch (error) {
      // Gérer les erreurs de hachage (par exemple, le format incorrect du hachage)
      console.error('Erreur de vérification du mot de passe :', error);
      return false;
    }
  }
}

// Middleware d'authentification pour valider les tokens JWT
