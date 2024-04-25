import { Test, TestingModule } from '@nestjs/testing';
import { DestinatairesController } from './destinataires.controller';
import { DestinatairesService } from './destinataires.service';

describe('DestinatairesController', () => {
  let controller: DestinatairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinatairesController],
      providers: [DestinatairesService],
    }).compile();

    controller = module.get<DestinatairesController>(DestinatairesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
