import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasOne, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Client, Delivery, Payment, Product } from ".";
import { IOrder } from "../../types/models";
import OrderProduct from "./orderproduct";

@Table({
  charset: "utf8",
  timestamps: true,
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

  @AllowNull(false)
  @NotNull
  @Column(DataType.BOOLEAN)
  canceled: boolean;

  @ForeignKey(() => Client)
  @Column
  clientId: string;

  @BelongsTo(() => Client)
  client: Client;

  @HasOne(() => Delivery)
  delivery: Delivery

  @HasOne(() => Payment)
  payment: Payment

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];

}
