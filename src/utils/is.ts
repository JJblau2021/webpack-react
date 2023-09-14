export const isProd = process.env.NODE_ENV === "production";

export function isFunction(fn: unknown): fn is Function {
  return typeof fn === "function";
}

export function isString(str: unknown): str is string {
  return typeof str === "string";
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === "object";
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === "undefined";
}
