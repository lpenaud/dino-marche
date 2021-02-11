import { AllowNull, Column, DataType, Model, NotNull, Table } from "sequelize-typescript";
import { IAdress } from "../../types/models";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Adress extends Model<IAdress> implements IAdress {

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
  
  @HasMany(() => Payment)
  payments: Payment[];
  
}
