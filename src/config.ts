import * as path from "path";
import * as dotenv from "dotenv";
import * as fs from "fs";
import logger from "./logger";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.sample"),
});
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

if (result.error) {
  if (result.error.message.startsWith("ENOENT")) {
    logger.warn("No {} provided use {} as fallback", { content: ".env", modifiers: "italic" }, { content: ".env.sample", modifiers: "italic" });
  } else {
    throw result.error;
  }
}

export const hostname = process.env.HOSTNAME;
export const port = parseInt(process.env.PORT);
export const prefix = process.env.PREFIX;
export const cert = Object.freeze({
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT),
});
export let started: Readonly<Date>;

export function start() {
  started = Object.freeze(new Date());
}

logger.assert(!isNaN(port), "Port must be a number")
logger.assert(hostname.length > 0, "Hostname must be provide");
logger.assert(/^[0-9A-Za-z/]+$/.test(prefix), "Pathname must be validate by the regExp");
