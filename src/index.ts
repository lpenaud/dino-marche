import * as http2 from "http2";
import * as Koa from "koa";
import { ALLOWED_HOSTS, API_CERT, API_HOSTNAME, API_LOG, API_PORT, API_PREFIX, MARIA_DB, MARIA_HOSTNAME, MARIA_PORT } from "./config";
import sequelize from "./models";
import apiRouter from "./routes/router";
import logger from "./utils/logger/singleton-logger";
import koaBody = require("koa-body");

console.time("Start in");

const app = new Koa()
  .use((ctx, next) => {
    if (ALLOWED_HOSTS.test(ctx.request.host)) {
      ctx.res.setHeader("Access-Control-Allow-Origin", "*");
    }
    next();
  })
  .use(koaBody({ multipart: true }))
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods())
  .use(API_LOG);

http2.createSecureServer(API_CERT, app.callback()).listen(API_PORT, API_HOSTNAME, () => {
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
