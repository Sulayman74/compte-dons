import * as argon2 from 'argon2';

import { Action, Role } from '@prisma/client';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto, SignIn, UpdateUserDto } from './dto';

import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private _prismaService: PrismaService,
    private _caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this._prismaService.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      throw new ConflictException('Oops!! cette personne existe déjà');
    }

    // ? il est possible de changer les options pour le hashage à voir le bon compromis perf/sec ?
    const hashOptions = {
      hashLength: 64,
      memory: 256,
      iterations: 15,
      parallelism: 2,
    };

    try {
      const hashedPassword = await argon2.hash(password, hashOptions);

      const addUser = await this._prismaService.user.create({
        data: { ...createUserDto, password: hashedPassword },
      });
      console.log('This action adds a new user', addUser);
      return addUser;
    } catch (error) {
      console.warn('erreur create user', error);
      throw new InternalServerErrorException(
        "Une erreur est survenue lors de la création de l'utilisateur.",
      );
    }
  }

  async findAll(): Promise<User[]> {
    const getUsers = await this._prismaService.user.findMany();
    return getUsers;
  }

  async findOne(id: string): Promise<User> {
    const getUser = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return getUser;
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {

    try {
      if (updateUserDto.password) {
        const hashedPassword = await argon2.hash(updateUserDto.password);
        return this._prismaService.user.update({
          where: { id: userId },
          data: { ...updateUserDto, password: hashedPassword },
        });
      } else {
        return this._prismaService.user.update({
          where: { id: userId },
          data: {...updateUserDto},
        });
      }
    } catch (error) {
      console.error(
        'Erreur lors de la mise à jour du profil utilisateur :',
        error,
      );
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la mise à jour du profil utilisateur.',
      );
    }
  }

  async remove(id: string) {
    const deleteUser = await this._prismaService.user.delete({
      where: { id },
    });
    return deleteUser;
  }
}
