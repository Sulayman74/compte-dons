import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { CreateDestinataireDto } from './create-destinataire.dto';
import { Destinataire } from '../entities/destinataire.entity';
import { Prisma } from '@prisma/client';

export class UpdateDestinataireDto extends PartialType(CreateDestinataireDto) {
    @ApiProperty()
    city?: string;
    @ApiProperty()
    country?: string;
    @ApiProperty()
    @IsEmail()
    email?: string;
    @ApiProperty()
    @IsString()
    firstname: string;
    id: string;
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
