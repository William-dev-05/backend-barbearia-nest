import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PromocoesService } from './promocoes.service';
import { CadastrarPromocaoDto, CadastrarRegraDto } from '../dto/promocao.dto';

@Controller('promocoes')
export class PromocoesController {
  constructor(private readonly promocoesService: PromocoesService) {}

  @Get('')
  listarPromocao() {
    return this.promocoesService.ListarPromocoes();
  }
  @Post('')
  cadastrarPromocao(@Body() promocao: CadastrarPromocaoDto) {
    if (
      promocao.titulo == null ||
      promocao.titulo == '' ||
      promocao.descricao == null ||
      promocao.descricao == ''
    ) {
      throw new HttpException(
        'Insira os dados da promocao',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.promocoesService.CadastrarPromocoes(promocao);
  }
  @Post('/regras')
  cadastrarRegra(@Body() regra: CadastrarRegraDto) {
    if (
      regra.descricao == null ||
      regra.descricao == '' ||
      regra.id_promocao == null
    ) {
      throw new HttpException(
        'Insira os dados da regra.',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.promocoesService.CadastrarRegras(regra);
  }
}
