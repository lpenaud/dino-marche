import { AllowNull, Column, DataType, Default, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { IImage, ImageMimeType } from "../../types/models";
import { DIR_IMAGE } from "../config";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Image extends Model<IImage> implements IImage {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.ENUM("image/jpeg", "image/png", "image/webp"))
  mimeType: ImageMimeType;

  @Column(DataType.VIRTUAL)
  get pathname(): string {
    return `${DIR_IMAGE}/${this.getDataValue("id")}`;
  }
}
