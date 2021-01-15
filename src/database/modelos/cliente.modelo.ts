import { DataType, Model, Column, Table } from 'sequelize-typescript';
import { Login } from './login.modelo';

@Table
export class Cliente extends Model<Cliente> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.STRING,
  })
  apelido: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  data: Date;

  @Column({
    type: DataType.INTEGER,
    references: {
      model: Login,
      key: 'id',
    },
  })
  id_login: number;
}
