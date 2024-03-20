import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: string
    firstname : string
    lastname : string
    email : string
    password : string
    phoneNumber: string
 
}
