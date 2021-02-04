import * as http2 from "http2";
import * as Koa from "koa";
import { API_CERT, API_HOSTNAME, API_PORT, API_PREFIX, start } from "./config";
import logger from "./logger";
import "./models";
import router from "./routes/router";

const app = new Koa()
  .use(router.routes())
  .use(router.allowedMethods());

http2.createSecureServer(API_CERT, app.callback()).listen(API_PORT, API_HOSTNAME, () => {
  logger.success(`Server listening at https://${API_HOSTNAME}:${API_PORT}${API_PREFIX}`);
  start();
});
