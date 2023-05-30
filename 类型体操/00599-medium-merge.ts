// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];

// ============= Your Code Here =============
/* Region 死脑经 */
// 可以把 MyOmit 换成TS自带的 Omit
// type MyOmit<T extends Record<string | number | symbol, any>, U> = { [K in keyof T as K extends U ? never : K]: T[K] };
// type Merge<F extends Record<string | number | symbol, any>, S extends Record<string | number | symbol, any>> = {
//   [K in keyof MyOmit<F, keyof S> | keyof S]: K extends keyof S ? S[K] : F[K];
// };
/* End 死脑经 */

type Merge<F extends Record<string | number | symbol, any>, S extends Record<string | number | symbol, any>> = {
  [K in keyof (F & S)]: K extends keyof S ? S[K] : F[K];
};

// 注意两个 Test预览 的差别
type Test1 = keyof Foo & Bar;
type Test2 = keyof (Foo & Bar);
