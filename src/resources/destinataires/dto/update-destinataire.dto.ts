import { CreateDestinataireDto } from './create-destinataire.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateDestinataireDto extends PartialType(CreateDestinataireDto) {
    city?: string;
    country?: string;
    email?: string;
    firstname: string;
    id?: string;
    isFamily: boolean;
    lastname: string;
    phoneNumber?: string;
    street?: string;
    zipcode?: string;

}
