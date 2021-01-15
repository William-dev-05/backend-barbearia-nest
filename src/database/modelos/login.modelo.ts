import { DataType, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Login extends Model<Login> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  usuario: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha: string;
}
