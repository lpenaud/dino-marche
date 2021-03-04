import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  NotNull,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { IAdress } from "../../types/models";
import Customer from "./customer";
import Payment from "./payment";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Adress extends Model<IAdress> implements IAdress {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

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

  @ForeignKey(() => Customer)
  @AllowNull(false)
  @NotNull
  @Column(DataType.UUID)
  clientId: string;

  @HasMany(() => Payment)
  payments: Payment[];

  @BelongsTo(() => Customer)
  customer: Customer;
}
