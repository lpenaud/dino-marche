import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasOne, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Order } from ".";
import { IDelivery } from "../../types/models";
import Adress from "./adress";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Delivery extends Model<IDelivery> implements IDelivery {

  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  shippingDate: Date;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  deliveryDate: Date;

  @ForeignKey(() => Adress)
  @Column
  adressId: string;

  @BelongsTo(() => Adress)
  adress: Adress;

  @HasOne(() => Order)
  order: Order;

  // TODO: Add JOIN Adress
  // see @OneToMany
  // https://sequelize.org/master/manual/assocs.html#one-to-many-relationships

}
