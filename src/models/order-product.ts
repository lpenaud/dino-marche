import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Order from "./order";
import Product from "./product";

@Table({
  charset: "utf8",
  timestamps: true,
})
export default class OrderProduct extends Model<OrderProduct> {
  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  orderId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  productId: string;
}
