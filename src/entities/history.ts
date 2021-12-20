import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import BaseModel from "./base";
import { Book } from "./book";
import { Member } from "./member";

@Table({tableName: 'histories'})
export class History extends BaseModel {

  @BelongsTo(() => Member, {
    onUpdate: 'CASCADE'
  })
  member: Member

  @ForeignKey(() => Member)
  @Column
  memberId: string

  @BelongsTo(() => Book, {
    onUpdate: 'CASCADE'
  })
  book: Book

  @ForeignKey(() => Book)
  @Column
  bookId: string

  @Column(DataType.BIGINT)
  startBorrow: number // timestamp

  @AllowNull(true)
  @Column(DataType.BIGINT)
  returnBook: number

}