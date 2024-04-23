import * as argon2 from 'argon2';

import { BadRequestException, Injectable } from '@nestjs/common';
import { SignIn, SignUp } from '../dto';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly _prismaService: PrismaService,
    private _jwtService: JwtService,
  ) {}

  async signIn(credentials: SignIn): Promise<User | { token: string }> {
    try {
      const user = await this._prismaService.user.findUnique({
        where: { email: credentials.email },
      });
      // Logique de connexion
    
      if (
        !user ||
        !(await this.validatePassword(credentials.password, user.password))
      ) {
        throw new BadRequestException('Identifiants incorrects');
      } else {
          // Si les identifiants sont valides, générer un token JWT et le retourner
        user.isAuthenticated = true; // Mettre isAuthenticated à true si les identifiants sont valides
        const payload = {
          sub: user.id,
          firstname: user.firstname,
          role: user.role,
          isAuthenticated: user.isAuthenticated
        };
        // Générer un token JWT avec les informations de l'utilisateur
        const token = this._jwtService.sign(payload);
        console.log(token);
        return { ...user, token };
      }

      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signUp(userData: SignUp): Promise<User | { token: string }> {
    const { email, password } = userData;

    const existingUser = await this._prismaService.user.findUnique({
      where: { email: email },
    });

    const hashedPassword = await argon2.hash(password);

    if (!existingUser) {
      try {
        const newUser = await this._prismaService.user.create({
          data: { ...userData, password: hashedPassword },
        });
        const payload = {
          sub: newUser.id,
          firstname: newUser.firstname,
          role: newUser.role,
          isAuthenticated: newUser.isAuthenticated
        };
        const token = this._jwtService.sign(payload);

        return { ...newUser, token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      throw new Error('Cet utilisateur existe déjà')
    };
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
