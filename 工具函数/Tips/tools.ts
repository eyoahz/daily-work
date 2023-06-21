/**
 * @description: 随机十六进制颜色值
 * @return {*}
 */
const randomHexColor: () => string = (): any =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

/**
 * @description: 获取用户选择的文本
 * @return {*}
 */
const getSelectedText: () => string | undefined = (): any => window.getSelection()?.toString();
