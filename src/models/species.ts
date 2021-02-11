import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Diet, Product } from ".";
import { ISpecies } from "../../types/models";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Species extends Model<ISpecies> implements ISpecies {

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
  @Column(DataType.STRING)
  otherName: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DOUBLE)
  size: number;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DOUBLE)
  length: number;

  @AllowNull(false)
  @NotNull
  @Column(DataType.DOUBLE)
  weight: number;

  @ForeignKey(() => Diet)
  @Column
  dietId: string;

  @BelongsTo(() => Diet)
  diet: Diet;

  @HasMany(() => Product)
  products: Product[];

}
