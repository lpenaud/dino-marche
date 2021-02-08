/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Logger from "./logger";

export default class NullLogger extends Logger {
  constructor() {
    super(process.stdout);
  }

  public assert(value: any, message?: string, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public clear(): void {
    // DO NOTHING
  }

  public count(label?: string): void {
    // DO NOTHING
  }

  public countReset(label?: string): void {
    // DO NOTHING
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public dir(obj: any, options?: NodeJS.InspectOptions): void {
    // DO NOTHING
  }

  public dirxml(...data: any[]): void {
    // DO NOTHING
  }

  public error(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public group(...label: any[]): void {
    // DO NOTHING
  }

  public groupCollapsed(...label: any[]): void {
    // DO NOTHING
  }

  public groupEnd(): void {
    // DO NOTHING
  }

  public info(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public log(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public table(tabularData: any, properties?: readonly string[]): void {
    // DO NOTHING
  }

  public time(label?: string): void {
    // DO NOTHING
  }

  public timeEnd(label?: string): void {
    // DO NOTHING
  }

  public timeLog(label?: string, ...data: any[]): void {
    // DO NOTHING
  }

  public trace(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    // DO NOTHING
  }

  public profile(label?: string): void {
    // DO NOTHING
  }

  public profileEnd(label?: string): void {
    // DO NOTHING
  }

  public timeStamp(label?: string): void {
    // DO NOTHING
  }
}
