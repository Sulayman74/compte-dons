import * as argon2 from 'argon2';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto, SignIn, UpdateUserDto } from './dto';

import { PrismaService } from '../../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private _prismaService: PrismaService) {}

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
    console.log(`This action returns a #${id} user`);
    return getUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const deleteUser = await console.log(`This action removes a #${id} user`);
    return;
  }
}
