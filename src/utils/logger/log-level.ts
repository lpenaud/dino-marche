/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogLevel } from "../../../types";
import Logger from "./logger";
import logger from "./singleton-logger";

export function parseLogLevel(level: string): LogLevel {
  const levels: LogLevel[] = ["debug", "info", "log", "warn", "error"];
  if (levels.some(l => l === level)) {
    return level as LogLevel;
  }
  logger.warn(`Unknow level '${level}' log is used as fallback`);
  return "log";
}

export function getLoggerLevel(logger: Logger, level: LogLevel): (message?: any, ...optionalParams: any[]) => void {
  return logger[level].bind(logger);
}
