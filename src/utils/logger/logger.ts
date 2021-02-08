import { Console } from "console";
import * as fs from "fs";
import * as path from "path";

fs.mkdirSync(path.join(process.cwd(), "logs"), { recursive: true });

function parseFilename(out: string | NodeJS.WritableStream): NodeJS.WritableStream {
  if (typeof out !== "string") {
    return out;
  }
  if (out === "stderr") {
    return process.stderr;
  }
  if (out === "stdout") {
    return process.stdout;
  }
  return fs.createWriteStream(path.join(process.cwd(), "logs", out));
}

export default class Logger extends Console {
  constructor(out: string | NodeJS.WritableStream) {
    super(parseFilename(out));
  }
}
