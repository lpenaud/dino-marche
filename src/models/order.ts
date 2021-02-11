import { AllowNull, Column, DataType, Default, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { IOrder } from "../../types/models";

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

}
