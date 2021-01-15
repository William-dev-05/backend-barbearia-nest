import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CriarClienteDto } from '../dto/cliente.dto';
import { QueryTypes } from 'sequelize';
import connection from '../../database/connection';
import { randomBytes } from 'crypto';

@Injectable()
export class AdmService {
  async criarCliente(cliente: CriarClienteDto, id_adm: number, token: string) {
    try {
      const [auth] = this.converter(
        await connection.query('SELECT * FROM adm_auth(:id, :token)', {
          replacements: { id: id_adm, token: token },
          type: QueryTypes.SELECT,
        }),
      );

      const toke = randomBytes(32).toString('hex');
      const date = new Date(cliente.data);
      let mes;
      if (date.getMonth() < 9) {
        mes = `0${date.getMonth() + 1}`;
      } else {
        mes = date.getMonth() + 1;
      }
      const senha = `${date.getDate() + 1}${mes}${date.getFullYear()}`;

      const [result] = this.converter(
        await connection.query(
          'SELECT * FROM cadastrar_cliente(:nome, :apelido, :data, :senha, :token)',
          {
            replacements: {
              nome: cliente.nome,
              apelido: cliente.apelido,
              senha: senha,
              data: cliente.data,
              token: toke,
            },
            type: QueryTypes.SELECT,
          },
        ),
      );
      const clientes = result.cadastrar_cliente;
      return clientes;
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async listarClientes(filtro: number, id_adm: number, token: string) {
    try {
      const [auth] = this.converter(
        await connection.query('SELECT * FROM adm_auth(:id, :token)', {
          replacements: { id: id_adm, token: token },
          type: QueryTypes.SELECT,
        }),
      );

      if (filtro == 0) {
        const clientes = this.converter(
          await connection.query('SELECT * FROM cliente ORDER BY nome', {
            type: QueryTypes.SELECT,
          }),
        );
        return clientes;
      }
      if (filtro == 1) {
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth();
        let clientes: any[] = [];
        const cli = this.converter(
          await connection.query('SELECT * FROM cliente ORDER BY nome', {
            type: QueryTypes.SELECT,
          }),
        );

        cli.forEach((cliente, index) => {
          let data = new Date(cliente.data);
          if (data.getMonth() == mesAtual) {
            clientes.push(cliente);
          }
        });

        return clientes;
      }

      if (filtro == 2) {
        const clientes = this.converter(
          await connection.query('SELECT * FROM view_cliente_pdg', {
            type: QueryTypes.SELECT,
          }),
        );

        return clientes;
      }

      if (filtro == 3) {
        const clientes = this.converter(
          await connection.query('SELECT * FROM view_posicao_quiz', {
            type: QueryTypes.SELECT,
          }),
        );
        return clientes;
      }

      if (filtro == 5) {
        const clientes = this.converter(
          await connection.query('SELECT * FROM view_cliente_f1', {
            type: QueryTypes.SELECT,
          }),
        );

        return clientes;
      }

      if (filtro == 6) {
        const clientes = this.converter(
          await connection.query('SELECT * FROM view_cliente_f2', {
            type: QueryTypes.SELECT,
          }),
        );

        return clientes;
      }
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deletarCliente(id_cliente: number, id_adm: number, token: string) {
    try {
      const [id_login] = this.converter(
        await connection.query('SELECT * FROM cliente WHERE id = :id', {
          replacements: { id: id_cliente },
          type: QueryTypes.SELECT,
        }),
      );

      if (!id_login) {
        throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
      }

      await connection.query('DELETE FROM cliente WHERE id = :id', {
        replacements: { id: id_cliente },
        type: QueryTypes.DELETE,
      });

      await connection.query('DELETE FROM login WHERE id = :id', {
        replacements: { id: id_login.id_login },
        type: QueryTypes.DELETE,
      });

      await connection.query('DELETE FROM cartao WHERE id_cliente = :id', {
        replacements: { id: id_cliente },
        type: QueryTypes.DELETE,
      });

      await connection.query('DELETE FROM carimbo WHERE id_cliente = :id', {
        replacements: { id: id_cliente },
        type: QueryTypes.DELETE,
      });

      await connection.query('DELETE FROM pontuacao WHERE id_cliente = :id', {
        replacements: { id: id_cliente },
        type: QueryTypes.DELETE,
      });

      return new HttpException('Cliente deletado com sucesso.', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async buscarClientes(id_cliente: number, id_adm: number, token: string) {
    try {
      const [auth] = this.converter(
        await connection.query('SELECT * FROM adm_auth(:id, :token)', {
          replacements: { id: id_adm, token: token },
          type: QueryTypes.SELECT,
        }),
      );
      const [cliente] = this.converter(
        await connection.query('SELECT * FROM buscar_cliente(:id)', {
          replacements: { id: id_cliente },
          type: QueryTypes.SELECT,
        }),
      );
      return cliente.buscar_cliente;
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  converter(objeto: object): any {
    return JSON.parse(JSON.stringify(objeto), null);
  }
}
