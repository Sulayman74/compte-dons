import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DonationsController],
  providers: [DonationsService, JwtService],
})
export class DonationsModule {}
