// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];

// ============= Your Code Here =============
// 解析: https://juejin.cn/post/7116115630549368863

// 利用数字特性，比如 1_000_000n 在程序 tostring 的时候其实会自动转换为 1000000，并不用我们考虑太多去除 \_ 或者 去除n 的逻辑
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`;
