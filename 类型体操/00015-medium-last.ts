// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [Expect<Equal<Last<[3, 2, 1]>, 1>>, Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>];

// ============= Your Code Here =============
// 第一种解法
// type Last<T extends any[]> = T extends [...any, infer Ending] ? Ending : never;

// 第二种解法
type Last<T extends any[]> = [any, ...T][T["length"]];
