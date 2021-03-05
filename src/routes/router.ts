import Router = require("koa-router");
import * as fs from "fs";
import { API_PREFIX, STARTED } from "../config";
import { Image } from "../models";
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
  .get("/image/:id", async (ctx, next) => {
    const image = await Image.findOne({
      where: {
        id: ctx.params.id,
      },
    });
    if (image !== null) {
      ctx.set("Content-Type", image.mimeType);
      ctx.body = fs.createReadStream(image.pathname);
    }
    next();
  })
  .use(productRouter.routes())
  .use(customerRouter.routes());

export default apiRouter;
