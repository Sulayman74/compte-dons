import { IsBoolean, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Donation } from '../entities/donation.entity';
import { Prisma } from '@prisma/client';
export class CreateDonationDto extends Donation {
  id?: string;
  @ApiProperty()
  @IsNumber()
  amout: number;
  @ApiProperty({ default: Date.now() })
  createdAt?: string | Date;
  @ApiProperty({ default: false })
  @IsBoolean()
  archived: boolean;
  @ApiProperty()
  user?: Prisma.UserCreateNestedOneWithoutDonationInput;
  archiveIn?: Prisma.ArchiveCreateNestedOneWithoutDonationInput;
}
