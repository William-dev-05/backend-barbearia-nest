import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Tipo_corte extends Model<Tipo_corte> {
  @Column({
    type: DataType.STRING,
  })
  tipo: string;
}
