import { Test, TestingModule } from '@nestjs/testing';
import { CorsMiddlewareService } from './cors-middleware.service';

describe('CorsMiddlewareService', () => {
  let service: CorsMiddlewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorsMiddlewareService],
    }).compile();

    service = module.get<CorsMiddlewareService>(CorsMiddlewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
