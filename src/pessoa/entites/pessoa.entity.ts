import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, Default } from 'sequelize-typescript';

@Table({ tableName: 'pessoa' })
export class Pessoa extends Model<Pessoa> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  uuid: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idade: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  cidade: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  sexo: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  localatendimento: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  condicaofisica: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  operador_nome: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  operador_email: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  datatime: Date;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updateAt: Date;
}
