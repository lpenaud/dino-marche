import { hash as _hash } from "bcrypt";
import { SALT_ROUNDS } from "../config";

export function hash(data: any): Promise<string> {
  return _hash(data, SALT_ROUNDS);
}

export { compare } from "bcrypt";

