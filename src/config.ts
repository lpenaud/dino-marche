import * as assert from "assert";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { parseLogLevel } from "./utils/logger/log-level";
import NullLogger from "./utils/logger/null-logger";
import SequelizeLogger from "./utils/logger/sequelize-logger";
import logger from "./utils/logger/singleton-logger";

function parseBoolean(envVar: string): boolean {
  const str = process.env[envVar];
  if (str === undefined || str === null) {
    return false;
  }
  const lowerCase = str.toLowerCase();
  if (lowerCase === "n") {
    return false;
  }
  if (lowerCase === "y") {
    return true;
  }
  logger.warn("{} is not valid value, so 'n' is used as fallback",
    { content: envVar, modifiers: "italic" },
  );
}

function readEnv() {
  const result = dotenv.config({
    path: path.join(process.cwd(), ".env"),
  });
  if (result.error) {
    if (result.error.message.startsWith("ENOENT")) {
      logger.warn("No {} provided use {} as fallback",
        { content: ".env", modifiers: "italic" },
        { content: ".env.sample", modifiers: "italic" }
      );
    } else {
      throw result.error;
    }
  }
  for (const key in result.parsed) {
    process.env[key] = result.parsed[key];
  }
}

dotenv.config({
  path: path.join(process.cwd(), ".env.sample"),
});
readEnv();

export const API_HOSTNAME = process.env.API_HOSTNAME;
export const API_PORT = parseInt(process.env.API_PORT);
export const API_PREFIX = process.env.API_PREFIX;
export const API_CERT = Object.freeze({
  key: fs.readFileSync(process.env.API_KEY),
  cert: fs.readFileSync(process.env.API_CERT),
});

export const MARIA_HOSTNAME = process.env.MARIA_HOSTNAME || "";
export const MARIA_PORT = parseInt(process.env.MARIA_PORT);
export const MARIA_DB = process.env.MARIA_DB;
export const MARIA_USER = process.env.MARIA_USER;
export const MARIA_PASSWORD = process.env.MARIA_PASSWORD;
export const MARIA_LOG_LEVEL = parseLogLevel(process.env.MARIA_LOG_LEVEL);
export const MARIA_LOG = process.env.MARIA_LOG !== undefined 
  ? new SequelizeLogger(process.env.MARIA_LOG)
  : new NullLogger();
export const MARIA_FORCE = parseBoolean("MARIA_FORCE");

export let started: Readonly<Date>;

export function start(): void {
  started = Object.freeze(new Date());
}

try {
  assert.ok(API_PORT, "API_PORT must be a number");
  assert.ok(/^[0-9A-Za-z/]+$/.test(API_PREFIX), "API_PREFIX must only be number and letters");
  assert.ok(MARIA_HOSTNAME, "MARIA_HOST must be provide");
  assert.ok(MARIA_PORT, "MARIA_PORT must be a number");
  assert.ok(MARIA_DB, "MARIA_DB must be provide");
  assert.ok(MARIA_USER, "MARIA_USER must be provide");
} catch (error) {
  logger.error(error.message);
  process.exit(-1);
}
