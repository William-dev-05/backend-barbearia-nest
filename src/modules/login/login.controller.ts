import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto, Login } from '../dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post('')
  fazerLogin(@Body() login: LoginDto): Promise<Login> {
    if (login.usuario == null || login.usuario == '') {
      throw new HttpException('Usuario obrigatorio', HttpStatus.UNAUTHORIZED);
    }

    if (login.senha == null || login.senha == '') {
      throw new HttpException('Senha obrigatoria', HttpStatus.UNAUTHORIZED);
    }

    return this.loginService.login(login);
  }
}
