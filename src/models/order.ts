import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasOne,
  IsUUID,
  Model,
  NotNull,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { Adress } from ".";
import { IOrder } from "../../types/models";
import Customer from "./customer";
import OrderProduct from "./order-product";
import Payment from "./payment";
import Product from "./product";

@Table({
  charset: "utf8",
  timestamps: true,
  deletedAt: true,
})
export default class Order extends Model<IOrder> implements IOrder {

  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  orderDate: Date;

  @ForeignKey(() => Customer)
  @AllowNull(false)
  @NotNull
  @Column(DataType.UUID)
  clientId: string;

  @ForeignKey(() => Adress)
  @AllowNull(false)
  @NotNull
  @Column(DataType.UUID)
  adressId: string;

  @BelongsTo(() => Customer)
  client: Customer;

  @BelongsTo(() => Adress)
  delivery: Adress;

  @HasOne(() => Payment)
  payment: Payment

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];
}
