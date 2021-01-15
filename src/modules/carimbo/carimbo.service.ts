import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CriarCarimboDto } from '../dto/carimbo.dto';
import connection from '../../database/connection';
import { QueryTypes } from 'sequelize';

@Injectable()
export class CarimboService {
  async registraCarimbo(
    id_adm: number,
    token: string,
    carimbo: CriarCarimboDto,
  ) {
    try {
      const [auth] = this.converter(
        await connection.query('SELECT * FROM adm_auth(:id, :token)', {
          replacements: { id: id_adm, token: token },
          type: QueryTypes.SELECT,
        }),
      );
      const date = new Date();
      const dia = date.getDate();
      const mes = date.getMonth() + 1;

      await connection.query(
        'INSERT INTO carimbo (dia, mes, id_tipo_corte, id_cliente) values (:dia, :mes, :id_tipo_corte, :id_cliente)',
        {
          replacements: {
            dia: dia,
            mes: mes,
            id_tipo_corte: carimbo.id_tipo_corte,
            id_cliente: carimbo.id_cliente,
          },
          type: QueryTypes.INSERT,
        },
      );
      const [id_carimbo] = this.converter(
        await connection.query(
          'SELECT id FROM carimbo WHERE dia = :dia AND mes = :mes AND id_tipo_corte = :id_tipo_corte AND id_cliente = :id_cliente',
          {
            replacements: {
              dia: dia,
              mes: mes,
              id_tipo_corte: carimbo.id_tipo_corte,
              id_cliente: carimbo.id_cliente,
            },
            type: QueryTypes.SELECT,
          },
        ),
      );

      if (carimbo.id_tipo_corte == 6) {
        const [cartao] = this.converter(
          await connection.query(
            'SELECT * FROM registrar_cartao_carimbo_gratis(:id_carimbo, :id_cliente)',
            {
              replacements: {
                id_carimbo: id_carimbo.id,
                id_cliente: carimbo.id_cliente,
              },
              type: QueryTypes.SELECT,
            },
          ),
        );
        return cartao.registrar_cartao_carimbo_gratis;
      }

      const [cartao] = this.converter(
        await connection.query(
          'SELECT * FROM registrar_cartao_carimbo(:id_carimbo, :id_cliente)',
          {
            replacements: {
              id_carimbo: id_carimbo.id,
              id_cliente: carimbo.id_cliente,
            },
            type: QueryTypes.SELECT,
          },
        ),
      );
      return cartao.registrar_cartao_carimbo;
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  converter(objeto: object): any {
    return JSON.parse(JSON.stringify(objeto), null);
  }
}
