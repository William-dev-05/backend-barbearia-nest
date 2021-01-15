import { Module } from '@nestjs/common';
import { BancoController } from './banco.controller';
import { BancoService } from './banco.service';

@Module({
  controllers: [BancoController],
  providers: [BancoService]
})
export class BancoModule {}
