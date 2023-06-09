// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      ["A", "B", "C"] | ["A", "C", "B"] | ["B", "A", "C"] | ["B", "C", "A"] | ["C", "A", "B"] | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      ["A", "B", "C"] | ["A", "C", "B"] | ["B", "A", "C"] | ["B", "C", "A"] | ["C", "A", "B"] | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];

// ============= Your Code Here =============

/**
 * 参考链接：https://juejin.cn/post/7165170011282079751
 *
 * Permutation<All, Item = All> 其中 Item 是为了能使用 Item extends All 把联合类型中的每一个类型都提取出来
 */
type Permutation<All, Item = All> = [All] extends [never]
  ? []
  : Item extends All
  ? [Item, ...Permutation<Exclude<All, Item>>]
  : never;
