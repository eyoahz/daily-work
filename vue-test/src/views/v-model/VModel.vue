<script lang="ts" setup>
import { reactive } from 'vue'
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse({ touch: false })

const data = reactive<Record<string, any>>({
  name: '小黑',
  age: 18,
  sex: 'male',
  hobby: 'soccer',
})
</script>

<template>
  <div>测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽</div>
  <slot name="test" :data="data" />
  <slot :data="data" />

  
  <div class="box"></div>
</template>

<style scoped lang="scss">
.box {
  width: 400px;
  aspect-ratio: 1;
  background-color: #f00;
}
</style>
