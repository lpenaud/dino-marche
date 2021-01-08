import * as http2 from "http2";
import * as Koa from "koa";
import { port, hostname, start, cert, prefix } from "./config";
import logger from "./logger";
import router from "./routes/router";

const app = new Koa()
  .use(router.routes())
  .use(router.allowedMethods());

http2.createSecureServer(cert, app.callback()).listen(port, hostname, () => {
  logger.success(`Server listening at https://${hostname}:${port}${prefix}`);
  start();
});
