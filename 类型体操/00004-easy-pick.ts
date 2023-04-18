// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

// ============= Your Code Here =============
// K extends keyof T => 将K的范围限制在 T 的键中(keyof T)
// P in K => 对K的值进行遍历(P) => T[P]就是 T中P键对应的值
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
