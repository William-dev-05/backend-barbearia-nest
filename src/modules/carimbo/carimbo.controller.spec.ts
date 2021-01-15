import { Test, TestingModule } from '@nestjs/testing';
import { CarimboController } from './carimbo.controller';

describe('CarimboController', () => {
  let controller: CarimboController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarimboController],
    }).compile();

    controller = module.get<CarimboController>(CarimboController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
