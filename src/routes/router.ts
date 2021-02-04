import * as Router from "koa-router";
import { API_PREFIX, started } from "../config";

const router = new Router({
  prefix: API_PREFIX,
});

router.get("/", (ctx) => {
  ctx.body = {
    started: started.getTime(),
    uptime: Date.now() - started.getTime(),
  };
});

export default router;
