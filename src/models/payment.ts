import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Adress, Order } from ".";
import { IPayment } from "../../types/models";

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

  @HasOne(() => Order)
  order: Order;

  @ForeignKey(() => Adress)
  @Column
  adressId: string;

  @BelongsTo(() => Adress)
  adress: Adress;

}
