import { IsBoolean, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class Donation implements Prisma.DonationCreateInput {
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
