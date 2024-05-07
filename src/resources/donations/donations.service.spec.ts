import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { DonationsService } from './donations.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DonationsService', () => {
  let service: DonationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [DonationsService, PrismaService],
    }).compile();

    service = module.get<DonationsService>(DonationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
