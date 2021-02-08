import * as fs from "fs";
import * as path from "path";
import { LogLevel } from "../../../types";
import Logger from "./logger";
import NullLogger from "./null-logger";
import singletonLogger from "./singleton-logger";

fs.mkdirSync(path.join(process.cwd(), "logs"), { recursive: true });

function getWriteStream(filename: string): NodeJS.WritableStream {
  if (filename === "stderr") {
    return process.stderr;
  }
  if (filename === "stdout") {
    return process.stdout;
  }
  return fs.createWriteStream(path.join(process.cwd(), "logs", filename));
}

function parseLogLevel(level: string): LogLevel {
  const levels: LogLevel[] = ["debug", "info", "log", "warn", "error"];
  if (levels.some(l => l === level)) {
    return level as LogLevel;
  }
  singletonLogger.warn(`Unknow level '${level}' log is used as fallback`);
  return "log";
}

export default function loggerFactory(LoggerClass: new(out: NodeJS.WritableStream) => Logger, level: string, filename?: string): (message?: unknown, ...optionalParams: unknown[]) => void {
  const logger =  Object.freeze(filename === undefined ? new NullLogger() : new LoggerClass(getWriteStream(filename)));
  return logger[parseLogLevel(level)].bind(logger);
}
