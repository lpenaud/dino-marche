import { AllowNull, Column, DataType, Default, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
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

}
