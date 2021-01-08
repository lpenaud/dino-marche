import * as assert from "assert";
import * as chalk from "chalk";
import { arrayOrValue, isString } from "./helpers";

interface Modifier {
  italic(...text: unknown[]): string;
  bold(...text: unknown[]): string;
  underline(...text: unknown[]): string;
  highlight(...text: unknown[]): string
}

const modifier: Modifier = {
  italic: chalk.italic,
  bold: chalk.bold,
  underline: chalk.underline,
  highlight(...text: unknown[]) {
    return chalk.inverse(chalk.black(...text));
  },
};

type format = string | {
  content: unknown;
  modifiers: arrayOrValue<keyof Modifier>;
}

const REG_EXP_FORMAT = /\{\}/g;

class Logger {
  constructor(out?: NodeJS.WriteStream) {
    this.out = out || process.stderr;
  }

  public warn(text: string, ...formats: format[]): void {
    this.writeLn(
      chalk.bgYellow("WARNING"),      
      chalk.yellow(this.format(text, formats))
    );
  }

  public error(text: string, ...formats: format[]): void {
    this.writeLn(chalk.bgRed("ERROR"), chalk.red(this.format(text, formats)));
  }

  public success(text: string, ...formats: format[]): void {
    this.writeLn(chalk.bgGreen("SUCCESS"), chalk.green(this.format(text, formats)));
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

  protected format(text: string, formats: format[]): string {
    return text.replace(REG_EXP_FORMAT, this.newReplacer(formats))
  }

  protected newReplacer(formats: format[]): () => string {
    const it = formats.values();
    return () => {
      let { value } = it.next();
      return isString(value) ? value : isString(value.modifiers)
        ? modifier[value.modifiers](value.content)
        : value.modifiers.reduce((content: string, m: keyof Modifier) => modifier[m](content), value.content);
    }
  }

  private out: NodeJS.WriteStream;
}

export default new Logger();
