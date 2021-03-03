import { hash } from "bcrypt";
import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  HasMany,
  IsEmail,
  IsUUID,
  Length,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique
} from "sequelize-typescript";
import { IClient } from "../../types/models";
import { SALT_ROUNDS } from "../config";
import Order from "./order";

@Table({
  charset: "utf8",
  timestamps: false,
})
export default class Client extends Model<Client> implements IClient {

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(instance: Client) {
    instance.password = await hash(instance.password, SALT_ROUNDS);
  }

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
  @Unique
  @Length({ min: 1, max: 20 })
  @Column(DataType.STRING)
  login: string;

  @AllowNull(false)
  @NotNull
  @Column(DataType.STRING)
  passwordHash: string;

  @AllowNull(false)
  @NotNull
  @Length({ min: 8 })
  @Column(DataType.VIRTUAL)
  get password(): string {
    return this.getDataValue("passwordHash");
  }
  set password(v: string) {
    this.setDataValue("password", v);
    this.setDataValue("passwordHash", v);
  }

  @HasMany(() => Order)
  orders: Order[];
}
