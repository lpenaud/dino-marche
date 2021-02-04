import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import logger from "./logger";

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
    path: path.resolve(process.cwd(), ".env"),
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
}

dotenv.config({
  path: path.resolve(process.cwd(), ".env.sample"),
});
readEnv();

export const API_HOSTNAME = process.env.API_HOSTNAME;
export const API_PORT = parseInt(process.env.API_PORT);
export const API_PREFIX = process.env.API_PREFIX;
export const API_CERT = Object.freeze({
  key: fs.readFileSync(process.env.API_KEY),
  cert: fs.readFileSync(process.env.API_CERT),
});

export const MARIA_HOST = process.env.MARIA_HOST;
export const MARIA_PORT = parseInt(process.env.MARIA_PORT);
export const MARIA_DB = process.env.MARIA_DB;
export const MARIA_USER = process.env.MARIA_USER;
export const MARIA_PASSWORD = process.env.MARIA_PASSWORD;
export const MARIA_LOG = parseBoolean("MARIA_LOG");
export const MARIA_FORCE = parseBoolean("MARIA_FORCE");

export let started: Readonly<Date>;

export function start(): void {
  started = Object.freeze(new Date());
}

logger.assert(!isNaN(API_PORT), "API_PORT must be a number");
logger.assert(API_HOSTNAME?.length > 0, "API_HOSTNAME must be provide");
logger.assert(/^[0-9A-Za-z/]+$/.test(API_PREFIX), "API_PREFIX must be validate by the regExp");
logger.assert(MARIA_HOST?.length > 0, "MARIA_HOST must be provide");
logger.assert(!isNaN(MARIA_PORT), "MARIA_PORT must be a number");
logger.assert(MARIA_DB?.length > 0, "MARIA_DB must be provide");
logger.assert(MARIA_USER?.length > 0, "MARIA_USER must be provide");
