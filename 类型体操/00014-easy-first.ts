// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];

// ============= Your Code Here =============
// 第一种解法：extends 类型条件判断
// type First<T extends any[]> = T extends [] ? never : T[0];

// 类型数组如果是个空数组的话，获取的 [0] 的类型的值是 undefined
// type test = First<[]>;

// 第二种解法：获取 tuple（即 元组）的 length 属性, 例：T['length']
// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

// 第三种解法：看某个值是否在 union（即 联合类型）中
// type First3<T extends any[]> = T[0] extends T[number] ? T[0] : never;

// T[number] 可以获得 联合类型
// type test = [3, 12, '123'][number]

// 第四种解法：infer（即 推断）
type First<T extends any[]> = T extends [infer First, ...any] ? First : never;

// 获取元组最后一个类型
// type MyTail<T extends unknown[]> = [any, ...T][T["length"]];
