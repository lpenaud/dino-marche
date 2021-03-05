import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
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
import { IProduct, ProductType } from "../../types/models";
import Diet from "./diet";
import Feedback from "./feedback";
import Image from "./image";
import ImageProduct from "./image-product";
import Order from "./order";
import OrderProduct from "./order-product";
import Species from "./species";

@Table({
  charset: "utf8",
  timestamps: true,
  deletedAt: true,
})
export default class Product extends Model<IProduct> implements IProduct {
  static get FEEDBACK_ASSOCIATION(): string {
    return "feedbacks";
  }

  static get IMAGE_ASSOCIATION(): string {
    return "images";
  }

  static get SPECIES_ASSOCIATION(): string {
    return "species"
  }

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
  @Column(DataType.DOUBLE)
  price: number;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  description: string;

  // Egg
  @Column(DataType.DATE)
  layDate: Date;

  // Dinosaur
  @Column(DataType.DATE)
  hatchDate: Date;

  // Food
  @Column(DataType.DOUBLE)
  quantity: number;

  // Goodie
  @AllowNull(false)
  @NotNull
  @Column(DataType.ENUM("Dinosaur", "Egg", "Food", "Goodie"))
  type: ProductType;

  @BelongsToMany(() => Order, () => OrderProduct)
  orders: Order[];

  @ForeignKey(() => Diet)
  @Column(DataType.UUID)
  dietId: string;

  @BelongsTo(() => Diet)
  diet: Diet;

  @ForeignKey(() => Species)
  @Column(DataType.UUID)
  speciesId: number;

  @BelongsTo(() => Species)
  species: Species;

  @HasMany(() => Feedback)
  feedbacks: Feedback[];

  @BelongsToMany(() => Image, () => ImageProduct)
  images: Image[];
}
