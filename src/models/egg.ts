import { AllowNull, Column, DataType, Default, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { IEgg } from "../../types/models";

@Table({
  charset: "utf8",
  timestamps: true,
})
export default class Egg extends Model<IEgg> implements IEgg {

  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.INTEGER)
  stock: number;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DOUBLE)
  price: number;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  description: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  hatchDate: Date;
}
