import { AllowNull, Column, DataType, Table } from "sequelize-typescript";
import BaseModel from "./base";

@Table({tableName: 'members'})
export class Member extends BaseModel {

  @Column
  code: string

  @Column
  name: string

  @AllowNull(true)
  @Column(DataType.TEXT)
  token: string

  @Column
  isPenalty: boolean

  @AllowNull(true)
  @Column(DataType.BIGINT)
  suspendedTime: number

  @AllowNull(true)
  @Column
  countBorrowed: number
}