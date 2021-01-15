import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/login/login.module';
import { AdmModule } from './modules/adm/adm.module';
import { CarimboModule } from './modules/carimbo/carimbo.module';
import { PromocoesModule } from './modules/promocoes/promocoes.module';
import { BancoModule } from './modules/banco/banco.module';

@Module({
  imports: [LoginModule, AdmModule, CarimboModule, PromocoesModule, BancoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
