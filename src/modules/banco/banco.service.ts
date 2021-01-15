import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import connection from '../../database/connection';
import { RespostaDto } from '../dto/banco.dto';

@Injectable()
export class BancoService {
  async ListarQuestoes(id: number) {
    try {
      const perg = this.converter(
        await connection.query('SELECT * FROM banco', {
          type: QueryTypes.SELECT,
        }),
      );

      const respostas = this.converter(
        await connection.query(
          'SELECT id_pergunta FROM respostas WHERE id_cliente = :id',
          {
            replacements: { id: id },
            type: QueryTypes.SELECT,
          },
        ),
      );

      let pergs = [];

      if (respostas.length > 0) {
        perg.forEach((pergunta, index) => {
          respostas.forEach((resposta, index) => {
            if (resposta.id_pergunta != pergunta.id) {
              pergs.push(pergunta);
              console.log(pergs);
            }
          });
        });

        if (pergs.length < 5) {
          return new HttpException(
            'Você ja atingio o numero maximo de questões.',
            HttpStatus.NOT_FOUND,
          );
        }

        const perguntas = [];

        for (let i = 0; i < 5; i++) {
          if (i == 0) {
            perguntas.push(pergs[Math.floor(Math.random() * pergs.length)]);
          } else {
            let pos = pergs[Math.floor(Math.random() * pergs.length)];
            console.log(pos);
            let x = i;
            let y = 0;
            while (x > 0) {
              if (perguntas[x - 1].id == pos.id) {
                y = 1;
              }
              x--;
            }
            if (y == 0) {
              perguntas.push(pos);
            } else {
              i--;
            }
            y = 0;
          }
        }
        return perguntas;
      } else {
        const perguntas = [];

        for (let i = 0; i < 5; i++) {
          if (i == 0) {
            perguntas.push(perg[Math.floor(Math.random() * perg.length)]);
          } else {
            let pos = perg[Math.floor(Math.random() * perg.length)];
            console.log(pos);
            let x = i;
            let y = 0;
            while (x > 0) {
              if (perguntas[x - 1].id == pos.id) {
                y = 1;
              }
              x--;
            }
            if (y == 0) {
              perguntas.push(pos);
            } else {
              i--;
            }
            y = 0;
          }
        }
        return perguntas;
      }
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async ResponderQuestoes(resposta: RespostaDto) {
    const [verificar] = this.converter(
      await connection.query('SELECT resposta FROM banco WHERE id = :id', {
        replacements: { id: resposta.id_pergunta },
        type: QueryTypes.SELECT,
      }),
    );

    const [pont] = this.converter(
      await connection.query('SELECT * FROM pontuacao WHERE id_cliente = :id', {
        replacements: { id: resposta.id_cliente },
        type: QueryTypes.SELECT,
      }),
    );

    if (pont.vidas == 0) {
      throw new HttpException(
        'Você não tem vidas para continuar.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const [resp] = await connection.query(
      'SELECT * FROM respostas WHERE id_cliente = :id_cliente AND id_pergunta = :id_pergunta',
      {
        replacements: {
          id_cliente: resposta.id_cliente,
          id_pergunta: resposta.id_pergunta,
        },
        type: QueryTypes.SELECT,
      },
    );

    if (resp) {
      throw new HttpException(
        'Você ja respondeu esta pergunta.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (resposta.resposta == verificar.resposta) {
      await connection.query(
        'INSERT INTO respostas (resposta, id_cliente, id_pergunta) VALUES (:resposta, :id_cliente, :id_pergunta)',
        {
          replacements: {
            resposta: resposta.resposta,
            id_cliente: resposta.id_cliente,
            id_pergunta: resposta.id_pergunta,
          },
          type: QueryTypes.INSERT,
        },
      );
      if (resposta.quantidade == 5) {
        const pontos = pont.pontos + 2;
        await connection.query(
          'UPDATE pontuacao SET pontos = :pontos WHERE id_cliente = :id',
          {
            replacements: { pontos: pontos, id: resposta.id_cliente },
            type: QueryTypes.UPDATE,
          },
        );
        throw new HttpException('Resposta correta.', HttpStatus.OK);
      } else {
        const pontos = pont.pontos + 1;
        await connection.query(
          'UPDATE pontuacao SET pontos = :pontos WHERE id_cliente = :id',
          {
            replacements: { pontos: pontos, id: resposta.id_cliente },
            type: QueryTypes.UPDATE,
          },
        );
        throw new HttpException('Resposta correta.', HttpStatus.OK);
      }
    }
    const vidas = pont.vidas - 1;
    await connection.query(
      'UPDATE pontuacao SET vidas = :vidas WHERE id_cliente = :id',
      {
        replacements: { vidas: vidas, id: resposta.id_cliente },
        type: QueryTypes.UPDATE,
      },
    );
    throw new HttpException('Resposta incorreta.', HttpStatus.NOT_ACCEPTABLE);
  }
  async Vidas(id_cliente: number) {
    const [pontuacao] = this.converter(
      await connection.query('SELECT * FROM pontuacao WHERE id_cliente = :id', {
        replacements: { id: id_cliente },
        type: QueryTypes.SELECT,
      }),
    );

    if (pontuacao.extras == 6) {
      throw new HttpException(
        'Não pode mais receber vidas extras hoje.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const vidas = pontuacao.vidas + 1;
    const extras = pontuacao.extras + 1;
    await connection.query(
      'UPDATE pontuacao SET vidas = :vidas, extras = :extras WHERE id_cliente = :id',
      {
        replacements: { vidas: vidas, extras: extras, id: id_cliente },
        type: QueryTypes.UPDATE,
      },
    );
    if (extras == 6) {
      throw new HttpException(
        'Vida extra adiquirida. Você atingiu o limite de vidas extras hoje.',
        HttpStatus.OK,
      );
    }
    throw new HttpException('Vida extra adiquirida.', HttpStatus.OK);
  }
  converter(objeto: object): any {
    return JSON.parse(JSON.stringify(objeto), null);
  }
}
