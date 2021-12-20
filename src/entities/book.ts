import { Column, Table } from "sequelize-typescript";
import BaseModel from "./base";

@Table({tableName: 'books'})
export class Book extends BaseModel {

  @Column
  code: string

  @Column
  title: string

  @Column
  author: string

  @Column
  stock: number
}