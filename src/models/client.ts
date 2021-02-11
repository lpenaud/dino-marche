import { AllowNull, Column, DataType, Default, IsEmail, IsUUID, Length, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { IClient } from "../../types/models";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Client extends Model<IClient> implements IClient {

  @PrimaryKey
  @IsUUID(4)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  lastName: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  name: string;

  // TODO: Add validator isPhone @Is
  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  phoneNumber: string;

  @AllowNull(false)
  @NotNull
  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @NotNull
  @Length({ min: 3, max: 20 })
  @Column(DataType.STRING)
  login: string;

  // TODO: Create VIRTUAL password
  // see https://sequelize.org/v3/api/datatypes/#virtual
  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  password: string;
  
  @HasMany(() => Order)
  orders: Order[];
  
}
