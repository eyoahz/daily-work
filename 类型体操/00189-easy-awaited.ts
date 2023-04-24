// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error
type error = MyAwaited<number>;

// ============= Your Code Here =============
/**
 * infer => 占位符（类似于设置数学中的未知数 ‘X’ ）
 *
 * 可以看出 PromiseLike 接口定义的就是一个拥有then()方法的对象（官方的叫法是 thenable），只要有then()方法就会将其当做一个Promise实例看待。
 */

type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? (U extends PromiseLike<any> ? MyAwaited<U> : U) : T;
