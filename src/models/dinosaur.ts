import { AllowNull, Column, DataType, Default, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { IDinosaur } from "../../types/models";

@Table({
  charset: "utf8",
  timestamps: true,
})
export default class Dinosaur extends Model<IDinosaur> implements IDinosaur {

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
  birthDate: Date;

}
