import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import connection from '../../database/connection';
import { Login, LoginDto } from '../dto/login.dto';
import { QueryTypes } from 'sequelize';

@Injectable()
export class LoginService {
  async login(log: LoginDto): Promise<any> {
    try {
      let status = 1;

      let [login] = this.converter(
        await connection.query('SELECT * FROM auth(:usuario, :senha)', {
          replacements: { usuario: log.usuario, senha: log.senha },
          type: QueryTypes.SELECT,
        }),
      );

      return login.auth;
    } catch (error) {
      throw new HttpException(error.stack, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  converter(objeto: object): any {
    return JSON.parse(JSON.stringify(objeto), null);
  }
}
