// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>
];

// ============= Your Code Here =============
// 联合类型 T 中排除 U
type MyExclude<T, U> = T extends U ? never : T;

// 前情提要
/**
 * union类型之间extends，T中的每一个类型都会与U中的每一个类型比较
 * 例：
 * type T = 'a' | 'b' | 'c'
 * type U = 'a' | 'b'
 * type Res = T extends U ? 1 : '2'
 */
