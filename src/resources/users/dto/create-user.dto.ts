import { Prisma } from '@prisma/client';
import { User } from "../entities/user.entity"

export class CreateUserDto extends User {

    id: string
    firstname : string
    lastname : string
    email : string
    password : string
    phoneNumber: string
    createdAt: Date
    donation?: Prisma.DonationCreateNestedManyWithoutUserInput;


}
