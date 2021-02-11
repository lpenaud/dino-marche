import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order, Product } from ".";
import { IOrderProduct } from "../../types/models";

@Table({
  charset: "utf8",
  timestamps: true,
})
export default class OrderProduct extends Model<IOrderProduct> implements IOrderProduct {

  @ForeignKey(() => Order)
  @Column
  orderId: string;

  @ForeignKey(() => Product)
  @Column
  productId: string;

}
