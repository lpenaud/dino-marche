/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Logger from "./logger";

export default class SequelizeLogger extends Logger {
  public log(message?: any, ...optionalParams: any[]): void {
    super.log(message);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    super.info(message);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public error(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }
}
