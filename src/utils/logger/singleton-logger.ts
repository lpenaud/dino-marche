import * as chalk from "chalk";
import { arrayOrValue, isString } from "../../helpers";
import Logger from "./logger";

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

class SingletonLogger extends Logger {
  constructor() {
    super(process.stderr);
  }

  public warn(text: string, ...formats: format[]): void {
    this._log(
      chalk.bgYellow("WARNING"),
      chalk.yellow(this.format(text, formats))
    );
  }

  public error(text: string | Error, ...formats: format[]): void {
    if (typeof text === "string") {
      this._log(chalk.bgRed("ERROR"), chalk.red(this.format(text, formats)));
    } else {
      this._log(chalk.bgRed("ERROR"), chalk.red(chalk.bold(text.name)) + chalk.red(text.message));
    }
  }

  public success(text: string, ...formats: format[]): void {
    this._log(chalk.bgGreen("SUCCESS"), chalk.green(this.format(text, formats)));
  }

  protected _log(title: string, text: string): void {
    super.log(chalk.bold(chalk.black(title)) + "\t" + text);
  }

  protected format(text: string, formats: format[]): string {
    return text.replace(REG_EXP_FORMAT, this.newReplacer(formats));
  }

  protected newReplacer(formats: format[]): () => string {
    const it = formats.values();
    return () => {
      const { value } = it.next();
      return isString(value) ? value : isString(value.modifiers)
        ? modifier[value.modifiers](value.content)
        : value.modifiers.reduce((content: string, m: keyof Modifier) => modifier[m](content), value.content);
    };
  }
}

export default new SingletonLogger();
