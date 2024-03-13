import { PartialType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class SignIn extends PartialType(User) {
  email: string;
  password: string;
}
