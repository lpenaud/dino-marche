import * as Router from "koa-router";
import { prefix, started } from "../config";

const router = new Router({
  prefix: prefix,
});

router.get("/", (ctx) => {
  ctx.body = {
    started: started.getTime(),
    uptime: Date.now() - started.getTime(),
  };
});

export default router;
