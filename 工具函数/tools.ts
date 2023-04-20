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

/**
 * @description: 筛选出对象中需要的属性，返回由筛选出的属性组成的对象的浅拷贝
 * @param {T} obj
 * @param {Array} keys
 * @return {*}
 */
function pick<T extends Record<string | number, any>, K extends keyof T>(obj: T, keys: Array<K>): Partial<Pick<T, K>> {
  const clone: Partial<Pick<T, any>> = {};
  keys.forEach((key) => {
    if (key in obj) {
      clone[key] = obj[key];
    }
  });
  return clone;
}

/**
 * @description: 防抖
 * @param {Function} fn
 * @param {number} timeout
 * @param {*} timeout
 * @return {*}
 */
function debounce(fn: Function, timeout: number) {
  let timer: any = null;
  // 利用闭包存储timer，不然每次重新执行函数，timer会被重置，无法起到判断的作用
  // 在没有递归调用的情况下，执行完成的setTimeout不需要使用clearTimeout清理
  return function (this: any, ...args: any[]) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      typeof fn === "function" && fn.apply(this, args);
    }, timeout);
  };
}

/**
 * @description: 节流
 * @param {Function} fn
 * @param {number} timeout
 * @param {boolean} immediate
 * @param {*} timeout
 * @param {*} timeout
 * @return {*}
 */
function throttle(fn: Function, timeout: number, immediate: boolean = true) {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    if (timer) return;
    if (immediate) {
      typeof fn === "function" && fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
    } else {
      timer = setTimeout(() => {
        typeof fn === "function" && fn.apply(this, args);
        timer = null;
      }, timeout);
    }
  };
}
