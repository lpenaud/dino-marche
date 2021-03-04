import * as assert from "assert";
import { Algorithm, sign as _sign, verify as _verify } from "jsonwebtoken";
import { JWT_ALGORITHM, JWT_EXP, JWT_SECRET } from "../config";

class AlgorithmError extends Error {
  constructor(msg: string) {
    super(msg);
    this.algs = getAlgs();
  }

  protected algs: Algorithm[];
}

export function getAlgs(): Algorithm[] {
  return [
    "ES256",
    "ES384",
    "ES512",
    "HS256",
    "HS384",
    "HS512",
    "PS256",
    "HS384",
    "PS384",
    "PS512",
    "RS256",
    "RS384",
    "RS512",
  ];
}

export function parseAlg(alg: string): Algorithm {
  const algs: string[] = getAlgs();
  assert.ok(algs.includes(alg), new AlgorithmError(`Algorithm '${alg} is not available`));
  return alg as Algorithm;
}

export function sign(payload: string | object | Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    _sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXP }, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  });
}

export function verify<T>(token: string): Promise<T> {
  return new Promise((resolve, reject) => {
    _verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] }, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as unknown as T)
    });
  });
}
