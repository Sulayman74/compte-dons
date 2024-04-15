import { $Enums, Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class SignUp implements User {
  createdAt?: string | Date;
  donation?: Prisma.DonationCreateNestedManyWithoutUserInput;
  @ApiProperty()
  @IsString()
  firstname: string;
  id?: string;
  @ApiProperty()
  @IsString()
  lastname: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @ApiProperty()
  role: $Enums.Role;
  @ApiProperty({ default: 'READ' })
  action: $Enums.Action;
}
