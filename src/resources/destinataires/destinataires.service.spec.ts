import { Test, TestingModule } from '@nestjs/testing';
import { DestinatairesService } from './destinataires.service';

describe('DestinatairesService', () => {
  let service: DestinatairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinatairesService],
    }).compile();

    service = module.get<DestinatairesService>(DestinatairesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
