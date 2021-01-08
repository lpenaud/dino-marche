export type arrayOrValue<T> = T[] | T;

export function isString(v: unknown): boolean {
  return typeof v === "string" || v instanceof String;
}
