<script lang="ts" setup>
import { createApp } from 'vue';


function createrRenderer(options: any) {
  function render(vnode: unknown, container: unknown) {
    patch(null, vnode, container, null, null)
  }
  function patch(n1: unknown, n2: unknown, container: unknown, n3: unknown, n4: unknown) {

  }

  return {
    createApp: createAppAPI(render)
  }
}

function createAppAPI(render: any) {
  return function createApp(rootComponent: any) {
    const app = {
      mount(rootContainer: any) {
        const vnode = createVNode(rootComponent)

        render(vnode, rootContainer);
      }
    }
    return app;
  }
} 

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
