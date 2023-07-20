<script lang="ts" setup>
import { useRouter } from 'vue-router'

const data = {
  name: '小黑'
}


const $router = useRouter();
console.log($router);
$router.beforeEach((from, to, next) => {
  next(vm => {
    console.log(vm, 123456);
    
  })
})



</script>

<template>
  <div class="box">404</div>
</template>

<style scoped lang="scss">
.box {
  width: 400px;
  aspect-ratio: 1;
  background-image: linear-gradient(#ff0 33%, #00f 0% 66%, #f0f 0%);
}
</style>
