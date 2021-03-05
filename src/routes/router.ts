import Router = require("koa-router");
import { API_PREFIX, STARTED } from "../config";
import customerRouter from "./customer";
import productRouter from "./product";

const apiRouter = new Router({
  prefix: API_PREFIX,
})
  .get("/", (ctx, next) => {
    ctx.body = {
      started: STARTED,
      uptime: Date.now() - STARTED,
    };
    next();
  })
  .use(productRouter.routes())
  .use(customerRouter.routes());

export default apiRouter;
