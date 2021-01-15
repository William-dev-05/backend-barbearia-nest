import { AdmService } from './adm.service';
import {
  Body,
  Controller,
  Post,
  Param,
  Headers,
  Get,
  Query,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CriarClienteDto, BuscarClienteDto } from '../dto/cliente.dto';

@Controller('adm')
export class AdmController {
  constructor(private readonly admService: AdmService) {}

  @Post('/:id')
  createCliente(
    @Body() cliente: CriarClienteDto,
    @Param() id_adm,
    @Headers('authorization') token: string,
  ) {
    if (id_adm.id == null) {
      throw new HttpException('Id_adm obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    if (token == null || token == '') {
      throw new HttpException('Token obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    if (cliente.nome == null || cliente.nome == '' || cliente.data == null) {
      throw new HttpException(
        'Dados do cliente obrigatorio',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.admService.criarCliente(cliente, id_adm.id, token);
  }

  @Get('/:id')
  listarCliente(
    @Param() id_adm,
    @Headers('authorization') token: string,
    @Query('filtro') filtro = 0,
  ) {
    if (id_adm.id == null) {
      throw new HttpException('Id_adm obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    if (token == null || token == '') {
      throw new HttpException('Token obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    return this.admService.listarClientes(filtro, id_adm.id, token);
  }

  @Delete('/:id')
  deleteCliente(
    @Param() id_adm,
    @Headers('authorization') token: string,
    @Query('id_cliente') id_cliente,
  ) {
    if (id_adm.id == null) {
      throw new HttpException('Id_adm obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    if (token == null || token == '') {
      throw new HttpException('Token obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    if (id_cliente == null) {
      throw new HttpException(
        'Id_cliente obrigatorio',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.admService.deletarCliente(id_cliente, id_adm, token);
  }

  @Get('/cliente/:id')
  buscarCliente(
    @Param() id_adm,
    @Headers('authorization') token: string,
    @Query('id_cliente') id_cliente,
  ) {
    if (id_adm.id == null) {
      throw new HttpException('Id_adm obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    if (token == null || token == '') {
      throw new HttpException('Token obrigatorio', HttpStatus.UNAUTHORIZED);
    }
    if (id_cliente == null) {
      throw new HttpException(
        'Id_cliente obrigatorio',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.admService.buscarClientes(id_cliente, id_adm.id, token);
  }
}
