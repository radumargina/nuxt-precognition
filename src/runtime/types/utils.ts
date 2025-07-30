type ArrayKeys<T extends unknown[]> =
T extends [unknown, ...unknown[]]
  ? T extends Record<infer Index, unknown>
    ? Index extends `${number}`
      ? Index
      : never
    : never
  : `${number}`

type ObjectKeys<T extends object> =
T extends unknown[]
  ? ArrayKeys<T>
  : keyof T & string

interface HasConstructor {
  new (...args: unknown[]): unknown
}

export type NestedKeyOf<T> = T extends Record<string | number, unknown>
  ? T extends HasConstructor
    ? never
    : T extends CallableFunction
      ? never
      : {
        [K in keyof T & (string | number)]:
        | `${K}`
        | (T[K] extends (infer U)[]
        ? U extends object
          ? `${K}.${number}` | `${K}.${number}.${NestedKeyOf<U>}`
          : `${K}.${number}`
        : T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : never)
      }[keyof T & (string | number)]
  : never

type SingleDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type ErrorStatusCode = `4${SingleDigit}${SingleDigit}` | `5${SingleDigit}${SingleDigit}`

export {}
