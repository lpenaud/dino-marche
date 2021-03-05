import * as crypto from "crypto";
import * as util from "util";

export const randomBytes = util.promisify(crypto.randomBytes);

export function sum(...args: number[]): number {
  return args.reduce((s, v) => s + v, 0);
}

export function moy(initalValue: number = 0, ...args: number[]): number {
  return args.length === 0 ? initalValue : sum(initalValue, ...args) / args.length;
}

export function intMoy(initalValue: number = 0, ...args: number[]): number {
  return Math.round(moy(initalValue, ...args));
}

export async function randomString(size: number, radix: number = 36): Promise<string> {
  const buf = await randomBytes(size);
  return buf.reduce((result, val) => result + val.toString(radix), "")
    .substr(0, size);
}
