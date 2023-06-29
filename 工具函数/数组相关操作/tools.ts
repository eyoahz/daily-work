/**
 * @description:  将数组中下标 start 到 end 的子数组翻转 注：该方法会改变源数组
 * @param {Array} arr
 * @param {number} start
 * @param {number} end
 * @return {*}
 */
function arrReverse<T>(arr: Array<T>, start: number, end: number) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]]; // 交换变量（解构赋值）
    start++;
    end--;
  }
}

/**
 * @description: 将数组中的元素向右轮转 k 个位置，其中 k 是非负数 注：该方法会改变源数组
 * @param {Array} arr
 * @param {number} k
 * @return {*}
 */
function arrRotate<T>(arr: Array<T>, k: number): void {
  const length: number = arr.length;
  if (k % length === 0) return;

  k %= length;

  arrReverse(arr, 0, length - 1);
  arrReverse(arr, 0, k - 1);
  arrReverse(arr, k, length - 1);
}
