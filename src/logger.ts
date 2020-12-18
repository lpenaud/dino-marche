import * as assert from "assert";
import * as chalk from "chalk";

class Logger {
  constructor(out?: NodeJS.WriteStream) {
    this.out = out || process.stderr;
  }

  public warn(text: unknown): void {
    this.writeLn(chalk.bgYellow("WARNING"), chalk.yellow(text));
  }

  public error(text: unknown): void {
    this.writeLn(chalk.bgRed("ERROR"), chalk.red(text));
  }

  public assert(test: boolean, text?: unknown): void {
    try {
      assert(test);
    } catch (error) {
      this.error(text || error.message);
      throw error;
    }
  }

  protected writeLn(title: string, text: string): void {
    this.out.write(chalk.bold(chalk.black(title)) + "\t" + text + "\n");
  }

  private out: NodeJS.WriteStream;
}

export default new Logger();
