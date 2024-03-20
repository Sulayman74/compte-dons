import { PartialType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class SignIn extends PartialType(User) {
  id?: string;
  email: string;
  password: string;
}
