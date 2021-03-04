import {
    AllowNull,
    Column,
    DataType,
    Default,
    HasMany,
    IsUUID,
    Model,
    NotNull,
    PrimaryKey, Table,
} from "sequelize-typescript";
  import { IFeedback } from "../../types/models";
  import Product from "./product";

  @Table({
    charset: "utf8",
    timestamps: false,
  })
  export default class Feedback extends Model<IFeedback> implements IFeedback {

    @PrimaryKey
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;
  
    @Column(DataType.STRING)
    text: string;

    @AllowNull(false)
    @NotNull
    @Column(DataType.INTEGER)
    stars: number;
  
    @HasMany(() => Product)
    products: Product[];
  
  }
  