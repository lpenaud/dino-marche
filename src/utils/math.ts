export function sum(...args: number[]): number {
  return args.reduce((s, v) => s + v, 0);
}

export function moy(initalValue: number = 0, ...args: number[]): number {
  return args.length === 0 ? initalValue : sum(initalValue, ...args) / args.length;
}

export function intMoy(initalValue: number = 0, ...args: number[]): number {
  return Math.round(moy(initalValue, ...args));
}
