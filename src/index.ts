import { fork } from "child_process";
import * as http2 from "http2";
import * as Koa from "koa";
import * as path from "path";
import {
  ALLOWED_HOSTS,
  API_CERT,
  API_HOSTNAME,
  API_LOG,
  API_PORT,
  API_PREFIX,
  MARIA_DB,
  MARIA_FORCE,
  MARIA_HOSTNAME,
  MARIA_PORT,
  TMP_DIR
} from "./config";
import sequelize from "./models";
import router from "./routes";
import logger from "./utils/logger/singleton-logger";
import koaBody = require("koa-body");
import cors = require("@koa/cors")

logger.time("Start in");

const app = new Koa()
  .use(cors({
    origin: (ctx) => ALLOWED_HOSTS.test(ctx.request.header.origin) ? "*" : "",
  }))
  .use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: TMP_DIR,
      multiples: true,
    },
    urlencoded: true,
  }))
  .use(router.routes())
  .use(router.allowedMethods());

function boot(): Promise<void> {
  return new Promise((resolve, reject) => {
    fork(path.join(process.cwd(), "boot/boot.js"), { silent: true })
    .on("close", (code) => code === 0 ? resolve() : reject(code));
  });
}

async function sequelizeConnect(): Promise<void> {
  logger.clear();
  try {
    await sequelize.sync({ force: MARIA_FORCE });
    logger.success(`Database mysql://${MARIA_HOSTNAME}:${MARIA_PORT}/${MARIA_DB} is connected`);
    logger.success(`Server listening at https://${API_HOSTNAME}:${API_PORT}${API_PREFIX}`);
    logger.timeEnd("Start in");
    if (MARIA_FORCE) {
      await boot();
    }
    app.use(API_LOG);
  } catch (error) {
    logger.error("Unable to connect to MariaDB");
    throw error;
  }
}

http2.createSecureServer(API_CERT, app.callback()).listen(API_PORT, API_HOSTNAME, () => {
  sequelizeConnect();
});
