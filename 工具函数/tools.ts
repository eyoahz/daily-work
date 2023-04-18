/**
 * @description: 用来删除对象中不需要的属性，返回删除后对象的浅拷贝
 * @param {T} obj
 * @param {Array} keys
 * @return {*}
 */
function omit<T extends Record<string | number, any>, K extends keyof T>(
  obj: T,
  keys: Array<K> // 类型 string 是为了某些未被声明的属性被omit，不加就限定传入 obj参数的属性名 union类型
  // keys: Array<K | string> // 类型 string 是为了某些未被声明的属性被omit，不加就限定传入 obj参数的属性名 union类型
): Omit<T, K> {
  const clone: T = { ...obj };
  keys.forEach((key) => {
    if (key in clone) {
      delete clone[key];
    }
  });

  return clone;
}

//
/**
 * @description: 筛选出对象中需要的属性，返回由筛选出的属性组成的对象的浅拷贝
 * @param {T} obj
 * @param {Array} keys
 * @return {*}
 */
function pick<T extends Record<string | number, any>, K extends keyof T>(obj: T, keys: Array<K>) {
  const clone: Partial<Record<K, any>> = {};
  keys.forEach((key) => {
    if (key in obj) {
      clone[key] = obj[key];
    }
  });
  return clone;
}
