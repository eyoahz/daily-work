// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============
// ! 要理解对象类型 联合类型（交集）和 交叉类型（并集）含义
// ! 对象类型是是所有对象的集合，而不是对象属性的集合
// ! 例如：type A = { x: number } 代表的是包含属性 x: number 的所有对象（例：{ x: number, y: string }）
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>;
