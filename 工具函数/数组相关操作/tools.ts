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
