import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { BancoService } from './banco.service';
import { RespostaDto } from '../dto/banco.dto';

@Controller('banco')
export class BancoController {
  constructor(private readonly bancoService: BancoService) {}
  @Get('')
  listarQuestao(@Query('id') id = 1) {
    if (id == null) {
      throw new HttpException(
        'Id cliente obrigatorio.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.bancoService.ListarQuestoes(id);
  }
  @Post('')
  ResponderQuestoe(@Body() resposta: RespostaDto) {
    if (
      resposta.id_cliente == null ||
      resposta.id_pergunta == null ||
      resposta.quantidade == null ||
      resposta.resposta == null
    ) {
      throw new HttpException(
        'Dados da resposta obrigatorios.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.bancoService.ResponderQuestoes(resposta);
  }
  @Post('/vidas')
  ReceberVida(@Body() id_cliente) {
    if (id_cliente.id_cliente == null) {
      throw new HttpException(
        'Id_cliente obrigatorio.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.bancoService.Vidas(id_cliente.id_cliente);
  }
}
