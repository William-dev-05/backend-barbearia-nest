export class CriarClienteDto {
  readonly nome: string;
  readonly apelido: string;
  readonly data: Date;
}

export class BuscarClienteDto {
  readonly id: number;
  readonly nome: string;
  readonly apelido?: string;
  readonly data: Date;
  readonly telefone?: string;
  readonly instagram?: string;
  readonly img?: BinaryType;
  readonly id_login: number;
}
