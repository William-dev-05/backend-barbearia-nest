import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import connection from '../../database/connection';
import { CadastrarPromocaoDto, CadastrarRegraDto } from '../dto/promocao.dto';

@Injectable()
export class PromocoesService {
  async ListarPromocoes() {
    try {
      const promocoes = this.converter(
        await connection.query('SELECT * FROM promocoes WHERE status = 1', {
          type: QueryTypes.SELECT,
        }),
      );
      const regras = this.converter(
        await connection.query('SELECT * FROM regras', {
          type: QueryTypes.SELECT,
        }),
      );

      promocoes.forEach((promocao, index) => {
        promocao.regras = [];
        regras.forEach((regra) => {
          if (promocao.id == regra.id_promocao) {
            promocoes[index] = {
              ...promocao,
            };
            promocoes[index].regras.push(regra.descricao);
          }
        });
      });

      return promocoes;
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async CadastrarPromocoes(promocao: CadastrarPromocaoDto) {
    try {
      await connection.query(
        'INSERT INTO promocoes (titulo, descricao, status) VALUES (:titulo, :descricao, 1)',
        {
          replacements: {
            titulo: promocao.titulo,
            descricao: promocao.descricao,
          },
          type: QueryTypes.INSERT,
        },
      );
      const promocoes = this.converter(
        await connection.query('SELECT * FROM promocoes  WHERE status = 1', {
          type: QueryTypes.SELECT,
        }),
      );
      const regras = this.converter(
        await connection.query('SELECT * FROM regras', {
          type: QueryTypes.SELECT,
        }),
      );

      promocoes.forEach((promocao, index) => {
        promocao.regras = [];
        regras.forEach((regra) => {
          if (promocao.id == regra.id_promocao) {
            promocoes[index] = {
              ...promocao,
            };
            promocoes[index].regras.push(regra.descricao);
          }
        });
      });

      return promocoes;
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async CadastrarRegras(regra: CadastrarRegraDto) {
    try {
      await connection.query(
        'INSERT INTO regras (descricao, id_promocao) VALUES (:descricao, :id_promocao)',
        {
          replacements: {
            descricao: regra.descricao,
            id_promocao: regra.id_promocao,
          },
          type: QueryTypes.INSERT,
        },
      );

      const promocoes = this.converter(
        await connection.query('SELECT * FROM promocoes  WHERE status = 1', {
          type: QueryTypes.SELECT,
        }),
      );
      const regras = this.converter(
        await connection.query('SELECT * FROM regras', {
          type: QueryTypes.SELECT,
        }),
      );

      promocoes.forEach((promocao, index) => {
        promocao.regras = [];
        regras.forEach((regra) => {
          if (promocao.id == regra.id_promocao) {
            promocoes[index] = {
              ...promocao,
            };
            promocoes[index].regras.push(regra.descricao);
          }
        });
      });

      return promocoes;
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  converter(objeto: object): any {
    return JSON.parse(JSON.stringify(objeto), null);
  }
}
