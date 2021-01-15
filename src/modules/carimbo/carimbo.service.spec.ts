import { Test, TestingModule } from '@nestjs/testing';
import { CarimboService } from './carimbo.service';

describe('CarimboService', () => {
  let service: CarimboService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarimboService],
    }).compile();

    service = module.get<CarimboService>(CarimboService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
