import Router = require("koa-router");
import * as fs from "fs";
import * as path from "path";

const MIMETYPE = Object.freeze({
  ".js": "application/javascript",
  ".css": "text/css",
});

function getContentType(filename: string) {
  const parsed = path.parse(filename);
  return MIMETYPE[parsed.ext];
}

const routerApp = new Router()
  .get("(.*)", (ctx, next) => {
    console.log(ctx.path);
    const contentType = getContentType(ctx.path);
    if (contentType === undefined) {
      ctx.res.setHeader("content-type", "text/html");
      ctx.body = fs.createReadStream("public/front/index.html");
    } else {
      ctx.res.setHeader("content-type", contentType);
      ctx.body = fs.createReadStream(path.join("public/front", ctx.path));
    }
    next();
  });