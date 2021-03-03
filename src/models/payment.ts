import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  NotNull,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { IPayment } from "../../types/models";
import Adress from "./adress";
import Order from "./order";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Payment extends Model<IPayment> implements IPayment {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  paymentMethod: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  paymentDate: Date;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  cardNumbers: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  CVC: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  expirationDate: Date;

  @ForeignKey(() => Adress)
  @AllowNull(false)
  @NotNull
  @Column(DataType.UUID)
  adressId: string;

  @ForeignKey(() => Order)
  @AllowNull(false)
  @NotNull
  @Column(DataType.UUID)
  orderId: string;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Adress)
  adress: Adress;
}
