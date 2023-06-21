// 十六进制颜色值

/**
 * @description: 随机十六进制颜色值
 * @return {*}
 */
function randomHexColor(): string {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
}
