import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Diet, Order, OrderProduct, Species } from ".";
import { IProduct } from "../../types/models";

@Table({
  charset: "utf8",
  timestamps: true,
})
export default class Product extends Model<IProduct> implements IProduct {

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

  // Dinosaur
  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  birthDate: Date;

  // Egg
  @AllowNull(false)
  @NotNull
  @Column(DataType.DATE)
  hatchDate: Date;

  // Food
  @AllowNull(false)
  @NotNull
  @Column(DataType.DOUBLE)
  quantity: number;

  // Goodie

  @AllowNull(false)
  @NotNull
  @Column(DataType.ENUM('Dinosaur', 'Egg', 'Food', 'Goodie'))
  type: string

  @BelongsToMany(() => Order, () => OrderProduct)
  orders: Order[];

  @ForeignKey(() => Diet)
  @Column
  dietId: string;

  @BelongsTo(() => Diet)
  diet: Diet;

  @ForeignKey(() => Species)
  @Column
  teamId: number;

  @BelongsTo(() => Species)
  species: Species;

}
