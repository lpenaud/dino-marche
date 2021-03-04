import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,

  Default,

  ForeignKey,


  Model,
  NotNull,
  PrimaryKey, Table
} from "sequelize-typescript";
import { Client } from ".";
import { IFeedback } from "../../types/models";
import Customer from "./customer";
import Product from "./product";

  @Table({
    charset: "utf8",
    timestamps: false,
  })
  export default class Feedback extends Model<IFeedback> implements IFeedback {
    @PrimaryKey
    @ForeignKey(() => Client)
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
    @Column(DataType.INTEGER)
    stars: number;
  
    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => Customer)
    customer: Customer
  }
  