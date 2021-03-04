import { ParameterizedContext } from "koa";

class HttpCode {
  constructor(status: number, message: string) {
    this._status = status;
    this._message = message;
  }

  send(ctx: ParameterizedContext, message?: string) {
    ctx.status = this._status;
    ctx.body = {
      status: this._status,
      message: message || this._message,
    };
  }

  protected _status: number;
  protected _message: string;
}

export const HTTP_CODES = Object.freeze({
  200: Object.freeze(new HttpCode(200, "OK")),
  201: Object.freeze(new HttpCode(201, "Created")),
  418: Object.freeze(new HttpCode(418, "I'm a teapot")),
});
