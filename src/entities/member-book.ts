import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import BaseModel from "./base";
import { Book } from "./book";
import { Member } from "./member";

@Table({tableName: 'memberBooks'})
export class MemberBook extends BaseModel {

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

}

// 3 days = 259200
// 1 week = 604800

// SEVEN_DAY=604800
// THREE_DAY=259200