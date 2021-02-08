/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk = require("chalk");
import { DefaultContext, ParameterizedContext } from "koa";
import { IRouterParamContext } from "koa-router";
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
  public debug(ctx: ParameterizedContext<any, DefaultContext & IRouterParamContext<any, Record<string, unknown>>>): void {
    super.debug(`${ctx.method} ${ctx.url} ${colorStatus(ctx.status)} ${JSON.stringify(ctx.body)}`);
  }

  public log(ctx: ParameterizedContext<any, DefaultContext & IRouterParamContext<any, Record<string, unknown>>>): void {
    super.log(`${ctx.method} ${ctx.url} ${ctx.status}`);
  }

  public warn(ctx: ParameterizedContext<any, DefaultContext & IRouterParamContext<any, Record<string, unknown>>>): void {
    if (ctx.status >= 400) {
      this.log(ctx);
    }
  }

  public error(ctx: ParameterizedContext<any, DefaultContext & IRouterParamContext<any, Record<string, unknown>>>): void {
    if (ctx.status >= 500) {
      this.log(ctx);
    }
  }
}
