import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { Tipo_corte } from './tipo_corte.modelo';

@Table
export class Carimbo extends Model<Carimbo> {
  @Column({
    type: DataType.INTEGER,
  })
  dia: number;

  @Column({
    type: DataType.INTEGER,
  })
  mes: number;

  @Column({
    type: DataType.INTEGER,
    references: {
      model: Tipo_corte,
      key: 'id',
    },
  })
  id_tipo_corte: number;
}
