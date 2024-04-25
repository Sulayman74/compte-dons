import { IsBoolean, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Donation } from '../entities/donation.entity';
import { Prisma } from '@prisma/client';

export class CreateDonationDto extends Donation {
  id?: string;
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiProperty({ default: new Date().toISOString() })
  createdAt?: string | Date;
  @ApiProperty({ default: false })
  @IsBoolean()
  archived: boolean;
  @ApiProperty()
  user?: Prisma.UserCreateNestedOneWithoutDonationsInput;
  archiveIn?: Prisma.ArchiveCreateNestedOneWithoutDonationsInput;
}
