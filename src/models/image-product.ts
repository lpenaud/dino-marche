import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Image from "./image";
import Product from "./product";

@Table({
  charset: "utf8",
  timestamps: true,
})
export default class ImageProduct extends Model<ImageProduct> {
  @ForeignKey(() => Image)
  @Column(DataType.UUID)
  imageId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  productId: string;
}
