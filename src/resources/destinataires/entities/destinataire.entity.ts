import { Prisma } from "@prisma/client";

export class Destinataire implements Prisma.DestinataireCreateInput {
    city?: string;
    country?: string;
    donation?: Prisma.DonationCreateNestedManyWithoutDestinataireInput;
    email?: string;
    firstname: string;
    id: string;
    isFamily: boolean;
    lastname: string;
    phoneNumber?: string;
    street?: string;
    zipcode?: string;

}
