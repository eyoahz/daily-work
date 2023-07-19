<script lang="ts" setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const data = reactive<Record<string, any>>({
  name: '小黑',
  age: 18,
  sex: 'male',
  hobby: 'soccer',
})

console.log(useRoute());

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
  background-image: linear-gradient(#ff0 33%, #00f 0% 66%, #f0f 0%);
}
</style>
