import { Test, TestingModule } from '@nestjs/testing';

import { ArchivesController } from './archives.controller';
import { ArchivesService } from './archives.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

describe('ArchivesController', () => {
  let controller: ArchivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [ArchivesController],
      providers: [ArchivesService, PrismaService],
    }).compile();

    controller = module.get<ArchivesController>(ArchivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
