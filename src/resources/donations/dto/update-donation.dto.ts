import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

import { Donation } from '../entities/donation.entity';
import { Prisma } from '@prisma/client';

export class UpdateDonationDto {
  id: string;
  @ApiProperty()
  @IsNumber()
  amount: number;
  updatedAt: Date;
  archived?: boolean;
  @ApiProperty()
  destinataire: Donation


}
