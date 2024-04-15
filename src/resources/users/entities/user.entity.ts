import { $Enums, Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class User implements Prisma.UserCreateInput {
  createdAt?: string | Date;
  donation?: Prisma.DonationCreateNestedManyWithoutUserInput;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description:'email de utilisateur'})
  email: string;
  @IsString()
  @ApiProperty()
  firstname: string;
  id?: string;
  @IsString()
  @ApiProperty()
  lastname: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @ApiProperty()
  phoneNumber: string;
  role: $Enums.Role;
  action: $Enums.Action;
}
