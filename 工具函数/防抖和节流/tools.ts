/**
 * @description: 防抖
 * @param {Function} fn
 * @param {number} timeout
 * @return {*}
 */
function debounce(fn: Function, timeout: number, immediate: boolean = false) {
  let timer: any = null;
  // 利用闭包存储timer，不然每次重新执行函数，timer会被重置，无法起到判断的作用
  // 在没有递归调用的情况下，已执行完成的setTimeout不需要使用clearTimeout清理
  // clearTimer()不会把定时器编号重置为 空
  return function (this: any, ...args: any[]) {
    timer && clearTimeout(timer);

    if (immediate) {
      !timer && typeof fn === "function" && fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, timeout);
    } else {
      timer = setTimeout(() => {
        typeof fn === "function" && fn.apply(this, args);
      }, timeout);
    }
  };
}

/**
 * @description: 节流
 * @param {Function} fn
 * @param {number} timeout
 * @param {boolean} immediate
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
