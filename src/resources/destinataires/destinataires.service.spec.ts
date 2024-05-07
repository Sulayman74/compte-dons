import { Test, TestingModule } from '@nestjs/testing';

import { ConfigModule } from '@nestjs/config';
import { DestinatairesService } from './destinataires.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('DestinatairesService', () => {
  let service: DestinatairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [DestinatairesService, PrismaService],
    }).compile();

    service = module.get<DestinatairesService>(DestinatairesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
