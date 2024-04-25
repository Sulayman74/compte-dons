import { Prisma } from "@prisma/client";

export class Destinataire implements Prisma.DestinataireCreateInput {
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
    donation?: Prisma.DonationCreateNestedManyWithoutDestinataireInput;

}
