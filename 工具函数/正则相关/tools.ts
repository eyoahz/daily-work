/**
 * @description:  匹配文件拓展名
 * @param {string} str
 * @return {*}
 */
function matchSuffix(str: string = ""): string {
  return str.match(/\.([^\.\\]+)$/g)?.[0] ?? "";
}
