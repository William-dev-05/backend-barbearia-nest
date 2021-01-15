import { DataType, Table, Column, Model } from 'sequelize-typescript';
import { Cliente } from './cliente.modelo';

@Table
export class Cartao extends Model<Cartao> {
  @Column({
    type: DataType.INTEGER,
  })
  c1: number;

  @Column({
    type: DataType.INTEGER,
  })
  c2: number;

  @Column({
    type: DataType.INTEGER,
  })
  c3: number;

  @Column({
    type: DataType.INTEGER,
  })
  cf1: number;

  @Column({
    type: DataType.INTEGER,
  })
  c4: number;

  @Column({
    type: DataType.INTEGER,
  })
  c5: number;

  @Column({
    type: DataType.INTEGER,
  })
  c6: number;

  @Column({
    type: DataType.INTEGER,
  })
  cf2: number;

  @Column({
    type: DataType.INTEGER,
  })
  c7: number;

  @Column({
    type: DataType.INTEGER,
  })
  c8: number;

  @Column({
    type: DataType.INTEGER,
  })
  c9: number;

  @Column({
    type: DataType.INTEGER,
  })
  cf3: number;

  @Column({
    type: DataType.INTEGER,
  })
  c10: number;

  @Column({
    type: DataType.INTEGER,
  })
  c11: number;

  @Column({
    type: DataType.INTEGER,
  })
  c12: number;

  @Column({
    type: DataType.INTEGER,
  })
  cf4: number;

  @Column({
    type: DataType.INTEGER,
    references: {
      model: Cliente,
      key: 'id',
    },
  })
  id_cliente: number;
}
