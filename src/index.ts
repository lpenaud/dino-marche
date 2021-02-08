import * as http2 from "http2";
import * as Koa from "koa";
import { API_CERT, API_HOSTNAME, API_PORT, API_PREFIX, MARIA_DB, MARIA_HOST, MARIA_PORT, start } from "./config";
import sequelize from "./models";
import router from "./routes/router";
import logger from "./utils/logger/singleton-logger";

const app = new Koa()
  .use(router.routes())
  .use(router.allowedMethods());

http2.createSecureServer(API_CERT, app.callback()).listen(API_PORT, API_HOSTNAME, () => {
  sequelize.authenticate().then(() => {
    logger.success(`Database mysql://${MARIA_HOST}:${MARIA_PORT}/${MARIA_DB} is connected`);
    logger.success(`Server listening at https://${API_HOSTNAME}:${API_PORT}${API_PREFIX}`);
    start();
  }).catch(err => {
    logger.error("Unable to connect to MariaDB");
    throw new Error(err);
  });
  logger.clear();
});
