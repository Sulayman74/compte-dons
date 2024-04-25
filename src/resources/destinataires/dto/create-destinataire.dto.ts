import { IsEmail, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Destinataire } from "../entities/destinataire.entity";
import { Prisma } from "@prisma/client";

export class CreateDestinataireDto extends Destinataire {
    @ApiProperty()
    city?: string;
    @ApiProperty()
    country?: string;
    @ApiProperty({ default: 'jonny@gmail.com' })
    @IsEmail()
    email?: string;
    @ApiProperty()
    @IsString()
    firstname: string;
    id?: string;
    @ApiProperty({ default: true })
    isFamily: boolean;
    @ApiProperty()
    @IsString()
    lastname: string;
    @ApiProperty()
    phoneNumber?: string;
    @ApiProperty()
    street?: string;
    @ApiProperty()
    zipcode?: string;
    donation?: Prisma.DonationCreateNestedManyWithoutDestinataireInput;

}
