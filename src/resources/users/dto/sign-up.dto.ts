import { Prisma } from "@prisma/client";
import { User } from "../entities/user.entity";

export class SignUp implements User {
    createdAt?: string | Date;
    donation?: Prisma.DonationCreateNestedManyWithoutUserInput;
    firstname: string;
    id?: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    password: string;
  }