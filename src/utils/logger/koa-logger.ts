/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk = require("chalk");
import { ParameterizedContext } from "koa";
import { isEmptyObject } from "../utils";
import Logger from "./logger";

function colorStatus(status: number): string {
  if (status >= 200) {
    if (status >= 300) {
      if (status >= 400) {
        if (status >= 500) {
          return chalk.red(status);
        }
        return chalk.yellow(status);
      }
      return chalk.cyan(status);
    }
    return chalk.green(status);
  }
  return status.toString();
}

export default class KoaLogger extends Logger {
  public debug(ctx: ParameterizedContext): void {
    const request = { ...ctx.request.body, ...ctx.request.files };
    const template: string[] = ["%s", "%s", "%s"];
    const args: unknown[] = [ctx.method, ctx.url, colorStatus(ctx.status)];
    if (isEmptyObject(request) === false) {
      template.push("%j");
      args.push(request);
    }
    if (isEmptyObject(ctx.body as object) === false) {
      template.push("%j");
      args.push(ctx.body);
    }
    super.debug(template.join(" "), ...args);
  }

  public log(ctx: ParameterizedContext): void {
    super.log(`${ctx.method} ${ctx.url} ${ctx.status}`);
  }

  public warn(ctx: ParameterizedContext): void {
    if (ctx.status >= 400) {
      this.log(ctx);
    }
  }

  public error(ctx: ParameterizedContext): void {
    if (ctx.status >= 500) {
      this.log(ctx);
    }
  }
}
