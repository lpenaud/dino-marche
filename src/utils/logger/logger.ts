import { Console } from "console";

export default class Logger extends Console {
  constructor(out: NodeJS.WritableStream) {
    super(out);
  }
}
