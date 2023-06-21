/**
 * @description: 随机十六进制颜色值
 * @return {*}
 */
const randomHexColor: () => string = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

/**
 * @description: 获取用户选择的文本
 * @return {*}
 */
const getSelectedText: () => string | undefined = () => window.getSelection()?.toString();

/**
 * @description: 将 RGB 转换为十六进制
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {*}
 */
const rgbToHex: (r: number, g: number, b: number) => string = (r, g, b) =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
