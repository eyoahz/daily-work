import { computed, unref } from 'vue'
// 默认命名前缀
export const defaultNamespace = 'el'

// BEM 命名字符拼接函数
const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  // 默认是 Block
  let cls = `${namespace}-${block}`
  // 如果存在 Block 后缀，也就是 Block 里面还有 Block，例如：el-form 下面还有一个 el-form-item
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  // 如果存在元素
  if (element) {
    cls += `__${element}`
  }
  // 如果存在修改器
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}


export const useNamespace = (block: string) => {
    // 命名前缀也就是命名空间
    const namespace = computed(() => defaultNamespace)
    return {
        namespace,
    }
}
