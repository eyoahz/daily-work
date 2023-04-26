// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>
];

// ============= Your Code Here =============
type Space = " " | "\n" | "\t";
type TrimLeft<S extends string> = S extends `${Space}${infer Rest}` ? TrimLeft<Rest> : S;

// 去除右边的空白字符串
type TrimRight<S extends string> = S extends `${infer Rest}${Space}` ? TrimRight<Rest> : S;

// 去除两边的空白字符串
type TrimBoth<S extends string> = TrimLeft<TrimRight<S>>;
