import * as assert from "assert";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { parseAlg } from "./utils/jwt";
import KoaLogger from "./utils/logger/koa-logger";
import loggerFactory from "./utils/logger/logger-factory";
import SequelizeLogger from "./utils/logger/sequelize-logger";
import logger from "./utils/logger/singleton-logger";

function parseBoolean(envVar: string): boolean {
  const str = process.env[envVar];
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
  return false;
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
  Object.assign(process.env, result.parsed);
}

function getAllowedHosts(): RegExp {
  const hosts = process.env.ALLOWED_HOSTS
    .split(",")
    .map(v => v.trim().replace(/\./g, "\\."));
  return new RegExp(`^https?:\/\/${hosts.join("|")}`);
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
export const API_LOG = loggerFactory(KoaLogger, process.env.API_LOG_LEVEL, process.env.API_LOG);

export const MARIA_HOSTNAME = process.env.MARIA_HOSTNAME || "";
export const MARIA_PORT = parseInt(process.env.MARIA_PORT);
export const MARIA_DB = process.env.MARIA_DB;
export const MARIA_USER = process.env.MARIA_USER;
export const MARIA_PASSWORD = process.env.MARIA_PASSWORD;
export const MARIA_LOG = loggerFactory(SequelizeLogger, process.env.MARIA_LOG_LEVEL, process.env.MARIA_LOG);
export const MARIA_FORCE = parseBoolean("MARIA_FORCE");

export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

export const DIR_IMAGE = path.resolve(process.env.DIR_IMAGE);
fs.rmSync(DIR_IMAGE, { recursive: true, force: true });
fs.mkdirSync(DIR_IMAGE, { recursive: true });

export const JWT_ALGORITHM = parseAlg(process.env.JWT_ALGORITHM);
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXP = parseInt(process.env.JWT_EXP);

export const TMP_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "dino-marche-"));

export const ALLOWED_HOSTS = getAllowedHosts();

export const STARTED = Date.now();

export const UUID4_PATH_TEST = "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ABab][0-9a-f]{3}-[0-9a-f]{12}$"

try {
  assert.ok(API_PORT, "API_PORT must be a number");
  assert.ok(/^[0-9A-Za-z/]+$/.test(API_PREFIX), "API_PREFIX must only be number and letters");
  assert.ok(MARIA_HOSTNAME, "MARIA_HOST must be provide");
  assert.ok(MARIA_PORT, "MARIA_PORT must be a int");
  assert.ok(MARIA_DB, "MARIA_DB must be provide");
  assert.ok(MARIA_USER, "MARIA_USER must be provide");
  assert.ok(SALT_ROUNDS, "SALT_ROUNDS must be a valid number");
  assert.ok(DIR_IMAGE, "DIR_IMAGE must be valid path");
  assert.ok(JWT_SECRET, "JWT_SECRET must be provide");
  assert.ok(JWT_EXP, "JWT_TTL must be a int");
} catch (error) {
  logger.error(error.message);
  process.exit(-1);
}
