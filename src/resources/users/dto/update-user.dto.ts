import { $Enums } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: string
    firstname: string
    lastname: string
    email: string
    password: string
    phoneNumber: string
    role?: $Enums.Role;

}
