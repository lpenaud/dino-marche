import * as Router from "koa-router";
import { API_PREFIX, STARTED } from "../config";

const router = new Router({
  prefix: API_PREFIX,
});

router.get("/", (ctx, next) => {
  ctx.body = {
    started: STARTED,
    uptime: Date.now() - STARTED,
  };
  next();
});

export default router;
