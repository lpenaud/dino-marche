import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Max,
  Min,
  Model,
  NotNull,
  PrimaryKey, Table
} from "sequelize-typescript";
import { IFeedback } from "../../types/models";
import Customer from "./customer";
import Product from "./product";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Feedback extends Model<IFeedback> implements IFeedback {
  @PrimaryKey
  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  customerId: string;

  @PrimaryKey
  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  productId: string

  @Default("")
  @Column(DataType.STRING)
  text: string;

  @AllowNull(false)
  @NotNull
  @Min(0)
  @Max(5)
  @Column(DataType.TINYINT({ unsigned: true, length: 5 }))
  stars: number;

  @Column(DataType.STRING)
  title: string;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Customer)
  customer: Customer
}
