import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

import { CreateDonationDto } from './create-donation.dto';

export class UpdateDonationDto extends PartialType(CreateDonationDto) {
  id?: string;
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiProperty({ default: false })
  @IsBoolean()
  archived: boolean;
}
