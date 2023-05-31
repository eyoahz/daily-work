<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";

const name = ref<string>('');
const data = reactive<Record<any, any>>({
    a: 123
})

// 防抖：规定事件内重复触发会重新计时
function debounce(fn: () => any, timeout: number = 500, immediate: boolean = false) {
  let timer: any = null
  return function (this: any, ...args: any) {
    timer && clearTimeout(timer)
    if (immediate) {
      !timer && typeof fn === 'function' && fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, timeout)
    } else {
      timer = setTimeout(() => {
        typeof fn === 'function' && fn.apply(this, args)
        timer = null
      }, timeout)
    }
  }
}

// 节流：规定时间内只承认一次操作
function throttle(fn: () => any, timeout: number, immediate: boolean = true) {
  let timer: any = null
  return function (this: any, ...args: any) {
    if (timer) return
    if (immediate) {
      typeof fn === 'function' && fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, timeout)
    } else {
      timer = setTimeout(() => {
        typeof fn === 'function' && fn.apply(this, args)
        timer = null
      }, timeout)
    }
  }
}

const handleClick1 = debounce(() => console.log('点击'), 1000, true)
const handleClick2 = throttle(() => console.log('点击'), 1000, false)

onMounted(() => {
  document.querySelectorAll('button')!.forEach(node => {
      node.innerHTML = '<div>傻逼123</div>'
  })
})
</script>

<template>
  <main>
    <button @click="handleClick1">防抖</button>
    <button @click="handleClick2">节流</button>
  </main>
</template>
