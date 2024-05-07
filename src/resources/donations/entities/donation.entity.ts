import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Prisma } from '@prisma/client';

export class Donation implements Prisma.DonationCreateInput {
  @ApiProperty()
  @IsNumber()
  amount: number;
  archived?: boolean;
  archiveIn?: Prisma.ArchiveCreateNestedOneWithoutDonationsInput;
  @ApiProperty({ default: new Date().toISOString() })
  createdAt: string | Date;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  destinataire: Prisma.DestinataireCreateNestedOneWithoutDonationInput;
  id: string;
  @ApiProperty()
  updatedAt: string | Date;
  user: Prisma.UserCreateNestedOneWithoutDonationsInput;

}
