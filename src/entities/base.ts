import { AllowNull, BeforeCreate, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
@Table
export default abstract class BaseModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id: string;

  @AllowNull(true)
  @CreatedAt
  @Column(DataType.DATE)
  createdDate: Date;

  @AllowNull(true)
  @UpdatedAt
  @Column(DataType.DATE)
  modifiedDate: Date;

  @BeforeCreate
  static generate(column: BaseModel) {
    column.id = uuid();
  }
}