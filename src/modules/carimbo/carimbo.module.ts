import { Module } from '@nestjs/common';
import { CarimboService } from './carimbo.service';
import { CarimboController } from './carimbo.controller';

@Module({
  providers: [CarimboService],
  controllers: [CarimboController]
})
export class CarimboModule {}
