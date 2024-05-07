import * as argon2 from 'argon2';

import { Test, TestingModule } from '@nestjs/testing';

import { CaslAbilityFactory } from '../../casl/casl-ability.factory/casl-ability.factory'
import { ConfigModule } from '@nestjs/config';
import { InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let caslAbilityFactory: CaslAbilityFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [UsersService, PrismaService, CaslAbilityFactory],
    }).compile();
    service = module.get<UsersService>(UsersService);
    caslAbilityFactory = module.get<CaslAbilityFactory>(CaslAbilityFactory); // Obtenez une instance de CaslAbilityFactory
    // prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Successfully creates a new user with valid input data
  it('should create a new user when valid input data is provided', async () => {
    // Arrange
    const createUserDto: any = {
      email: 'test@example.com',
      password: 'password123',

    };

    const existingUser = null;
    const hashOptions = {
      hashLength: 64,
      memory: 256,
      iterations: 15,
      parallelism: 2,
    };
    const hashedPassword = await argon2.hash(
      createUserDto.password,
      hashOptions,
    );
    const addUser = {
      ...createUserDto,
      password: hashedPassword,
    };

    const prismaServiceMock = {
      user: {
        findUnique: jest.fn().mockResolvedValue(existingUser),
        create: jest.fn().mockResolvedValue(addUser),
      },
    };
    const caslAbilityFactoryMock = {
      createForUser: jest.fn(),
    };
    const usersService = new UsersService(prismaServiceMock as any, caslAbilityFactoryMock as any);

    // Act
    const result = await usersService.create(createUserDto);

    // Assert
    expect(prismaServiceMock.user.findUnique).toBeTruthy()
    expect(prismaServiceMock.user.create).toBeTruthy()
    expect(result).toEqual(addUser);
  });


  // Throws an InternalServerErrorException if there is an error while creating a new user
  it('should throw an InternalServerErrorException when there is an error while creating a new user', async () => {
    // Arrange
    const createUserDto: any = {
      email: 'test@example.com',
      password: 'password123',
      firstname: 'John',
      lastname: 'Doe',
      phoneNumber: '1234567890',
    };

    const existingUser = null;

    const prismaServiceMock = {
      user: {
        findUnique: jest.fn().mockResolvedValue(existingUser),
        create: jest.fn().mockRejectedValue(new Error('Database error')),
      },
    };
    const caslAbilityFactoryMock = {
      createForUser: jest.fn(),
    };

    const usersService = new UsersService(prismaServiceMock as any, caslAbilityFactoryMock as any);

    // Act and Assert
    await expect(usersService.create(createUserDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
