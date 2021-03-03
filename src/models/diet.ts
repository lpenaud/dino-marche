import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  IsUUID,
  Model,
  NotNull,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import { IDiet } from "../../types/models";
import Product from "./product";
import Species from "./species";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Diet extends Model<IDiet> implements IDiet {
  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => Product)
  products: Product[];

  @HasMany(() => Species)
  species: Species[];
}
