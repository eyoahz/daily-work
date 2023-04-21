// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

// ============= Your Code Here =============
// 通过 as 实现键名重新映射（Key Remapping via as）TypeScript 4.1后可以使用
// 参考：https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
type MyOmit<T extends Record<string | number, any>, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

// TypeScript 4.1版本前的解法
// type MyExclude<T, K> = T extends K ? never : T;
// type MyOmit<T extends Record<string | number, any>, K extends keyof T> = {
//   [P in MyExclude<keyof T, K>]: T[P]
// };
