// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];

type ComplexObject = {
  a: [12, "foo"];
  bar: "hello";
  prev(): number;
};

const fn = (v: boolean) => (v ? 1 : 2);
const fn1 = (v: boolean, w: any) => (v ? 1 : 2);

const fn2 = function (v: boolean) {
  return v ? 1 : 2;
};

// ============= Your Code Here =============
// ts 中要分清 类型和值 的区别， 例如：(v: boolean) => (v ? 1 : 2)是值   (v: boolean) => 1 | 2是类型
// 获取函数返回值的类型
type MyReturnType<T extends (...args: any[]) => unknown> = T extends (...args: any[]) => infer X ? X : never;
