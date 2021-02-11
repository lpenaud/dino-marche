import { AllowNull, Column, DataType, HasMany, Model, NotNull, Table } from "sequelize-typescript";
import { Delivery } from ".";
import { IAdress } from "../../types/models";
import Payment from "./payment";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Adress extends Model<IAdress> implements IAdress {
  delivery: Delivery[];
  payment: Payment[];

  // TODO: Add validator @Is @Lenght
  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  zipCode: string;

  // TODO: Enums?
  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  country: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  city: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  street: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.INTEGER)
  houseNumber: number;

  @HasMany(() => Delivery)
  deliveries: Delivery[];

  @HasMany(() => Payment)
  payments: Payment[];

}
