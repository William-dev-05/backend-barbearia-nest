import { Test, TestingModule } from '@nestjs/testing';
import { PromocoesService } from './promocoes.service';

describe('PromocoesService', () => {
  let service: PromocoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromocoesService],
    }).compile();

    service = module.get<PromocoesService>(PromocoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
