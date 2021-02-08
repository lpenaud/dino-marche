import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import {
  MARIA_DB,
  MARIA_FORCE,
  MARIA_HOST,
  MARIA_LOG,
  MARIA_LOG_LEVEL,
  MARIA_PASSWORD,
  MARIA_PORT,
  MARIA_USER
} from "../config";
import { getLoggerLevel } from "../utils/logger/log-level";
import Adress from "./adress";
import Client from "./client";
import Delivery from "./delivery";
import Diet from "./diet";
import Dinosaur from "./dinosaur";
import Egg from "./egg";
import Food from "./food";
import Goodie from "./goodie";
import Order from "./order";
import Payment from "./payment";
import Species from "./species";

const sequelize = new Sequelize({
  dialect: "mariadb",
  models: [
    Client,
    Delivery,
    Adress,
    Order,
    Payment,
    Dinosaur,
    Egg,
    Food,
    Goodie,
    Diet,
    Species,
  ],
  dialectOptions: {
    timezone: "Etc/GMT-1",
  },
  database: MARIA_DB,
  host: MARIA_HOST,
  password: MARIA_PASSWORD,
  port: MARIA_PORT,
  username: MARIA_USER,
  logging: getLoggerLevel(MARIA_LOG, MARIA_LOG_LEVEL),
  sync: {
    force: MARIA_FORCE,
  }
} as SequelizeOptions);

export {
  Client,
  Delivery,
  Adress,
  Order,
  Payment,
  Dinosaur,
  Egg,
  Food,
  Goodie,
  Diet,
  Species,
};

export default sequelize;
