import { $Enums, Prisma } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @ApiProperty({ default: new Date().toISOString() })
  createdAt: Date;
  donation?: Prisma.DonationCreateNestedManyWithoutUserInput;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  phoneNumber: string;
  role: $Enums.Role;
  action: $Enums.Action;
}
