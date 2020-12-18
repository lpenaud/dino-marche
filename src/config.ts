import * as path from "path";
import * as dotenv from "dotenv";
import logger from "./logger";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.sample"),
});
const result = dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

if (result.error) {
  if (result.error.message.startsWith("ENOENT")) {
    logger.warn(result.error.message)
  } else {
    throw result.error;
  }
}

export const hostname = process.env.HOSTNAME;
export const port = parseInt(process.env.PORT);
export const pathname = process.env.PATHNAME;

logger.assert(isNaN(port), "Port must be a number")
logger.assert(hostname.length > 0, "Hostname must be provide");
logger.assert(/^[0-9A-Za-z]+$/.test(pathname), "Pathname must be validate by the regExp");

