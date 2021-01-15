import { Test, TestingModule } from '@nestjs/testing';
import { PromocoesController } from './promocoes.controller';

describe('PromocoesController', () => {
  let controller: PromocoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromocoesController],
    }).compile();

    controller = module.get<PromocoesController>(PromocoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
