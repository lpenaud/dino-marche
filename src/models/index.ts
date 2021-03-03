import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import {
  MARIA_DB,
  MARIA_FORCE,
  MARIA_HOSTNAME,
  MARIA_LOG,
  MARIA_PASSWORD,
  MARIA_PORT,
  MARIA_USER
} from "../config";
import Adress from "./adress";
import Client from "./client";
import Diet from "./diet";
import Order from "./order";
import OrderProduct from "./order-product";
import Payment from "./payment";
import Product from "./product";
import Species from "./species";

const sequelize = new Sequelize({
  dialect: "mariadb",
  models: [
    Adress,
    Client,
    Diet,
    OrderProduct,
    Order,
    Payment,
    Product,
    Species,
  ],
  dialectOptions: {
    timezone: "Etc/GMT-1",
  },
  database: MARIA_DB,
  host: MARIA_HOSTNAME,
  password: MARIA_PASSWORD,
  port: MARIA_PORT,
  username: MARIA_USER,
  logging: MARIA_LOG,
  sync: {
    force: MARIA_FORCE,
  }
} as SequelizeOptions);

export {
  Client,
  Adress,
  Order,
  Payment,
  Product,
  Diet,
  Species,
};

export default sequelize;
