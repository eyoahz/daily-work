// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============
type MyExclude<T, K> = T extends K ? never : T;
// 这里 K extends keyof T = keyof T 实现的是默认约束，类似函数参数中的默认值
// 即MyReadonly2<T> 等价于 MyReadonly2<T, keyof T>
type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [P in K]: T[P] } & { [P in MyExclude<keyof T, K>]: T[P] };

// type MyReadonly2<T, K extends keyof T = keyof T> = { readonly [P in K]: T[P] } & Omit<T, K>
