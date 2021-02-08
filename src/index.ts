import * as http2 from "http2";
import * as Koa from "koa";
import { API_CERT, API_HOSTNAME, API_LOG, API_PORT, API_PREFIX, MARIA_DB, MARIA_HOSTNAME, MARIA_PORT } from "./config";
import sequelize from "./models";
import router from "./routes/router";
import logger from "./utils/logger/singleton-logger";

const app = new Koa()
  .use(router.routes())
  .use(router.allowedMethods())
  .use(API_LOG);

http2.createSecureServer(API_CERT, app.callback()).listen(API_PORT, API_HOSTNAME, () => {
  console.time("Start in");
  sequelize.authenticate().then(() => {
    logger.success(`Database mysql://${MARIA_HOSTNAME}:${MARIA_PORT}/${MARIA_DB} is connected`);
    logger.success(`Server listening at https://${API_HOSTNAME}:${API_PORT}${API_PREFIX}`);
    console.timeEnd("Start in");
  }).catch(err => {
    logger.error("Unable to connect to MariaDB");
    throw new Error(err);
  });
  logger.clear();
});
