import { BuscarClienteDto } from './cliente.dto';
import { BuscarCartaoDto } from './cartao.dto';
import { BuscarPontuacaoDto } from './pontuacao.dto';

export class LoginDto {
  readonly usuario: string;
  readonly senha: string;
}

export class BuscarLoginDto {
  readonly id: number;
  readonly usuario: string;
  readonly senha: string;
  readonly token: string;
}

export class Login {
  readonly login: BuscarLoginDto;
  readonly cliente: BuscarClienteDto;
  readonly cartao: BuscarCartaoDto;
  readonly status: number;
  readonly pontuacao: BuscarPontuacaoDto;
}
