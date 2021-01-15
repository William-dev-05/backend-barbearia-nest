import {
  Controller,
  Param,
  Post,
  Headers,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CarimboService } from './carimbo.service';
import { CriarCarimboDto } from '../dto/carimbo.dto';

@Controller('carimbo')
export class CarimboController {
  constructor(private readonly carimboService: CarimboService) {}

  @Post('/:id')
  registrarCarimbo(
    @Param() id_adm,
    @Headers('authorization') token: string,
    @Body() carimbo: CriarCarimboDto,
  ) {
    if (id_adm.id == null) {
      throw new HttpException('Id_adm obrigatorio.', HttpStatus.UNAUTHORIZED);
    }
    if (token == null || token == '') {
      throw new HttpException('Token Obrigatorio.', HttpStatus.UNAUTHORIZED);
    }
    if (carimbo.id_cliente == null || carimbo.id_tipo_corte == null) {
      throw new HttpException(
        'Dados do carimbo obrigatorios.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.carimboService.registraCarimbo(id_adm.id, token, carimbo);
  }
}
