export class CarimboDto {
  readonly tipo: string;
  readonly dia: number;
  readonly mes: number;
}

export class BuscarCartaoDto {
  readonly id: number;
  readonly c1: CarimboDto;
  readonly c2: CarimboDto;
  readonly c3: CarimboDto;
  readonly cf1: CarimboDto;
  readonly c4: CarimboDto;
  readonly c5: CarimboDto;
  readonly c6: CarimboDto;
  readonly cf2: CarimboDto;
  readonly c7: CarimboDto;
  readonly c8: CarimboDto;
  readonly c9: CarimboDto;
  readonly cf3: CarimboDto;
  readonly c10: CarimboDto;
  readonly c11: CarimboDto;
  readonly c12: CarimboDto;
  readonly cf4: CarimboDto;
}

export class BuscarLoginCartaoDto {
  readonly id: number;
  readonly c1: string;
  readonly c2: string;
  readonly c3: string;
  readonly cf1: string;
  readonly c4: string;
  readonly c5: string;
  readonly c6: string;
  readonly cf2: string;
  readonly c7: string;
  readonly c8: string;
  readonly c9: string;
  readonly cf3: string;
  readonly c10: string;
  readonly c11: string;
  readonly c12: string;
  readonly cf4: string;
  readonly id_cliente: number;
}
