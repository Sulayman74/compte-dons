import { $Enums } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignIn {
  id?: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  role : $Enums.Role
  action : $Enums.Action
  isAuthenticated :boolean
}
