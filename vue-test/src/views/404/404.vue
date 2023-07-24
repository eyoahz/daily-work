<script lang="ts" setup>


function hostCreateElement(type: any) {

}

function hostSetElementText(el: any, text: any) {

}

function patch(n1: any, n2: any, container: any) {

}

function mountElement(vnode: any) {
  const el = (vnode.el = hostCreateElement(vnode.type))

  const { children } = vnode;

  if (typeof children === 'string') {
    hostSetElementText(el, children)
  } else if (Array.isArray(children)) {
    children.forEach((v) => {
      patch(null, v, el)
    })
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
