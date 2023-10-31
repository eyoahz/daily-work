<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue';

const show = ref<boolean>(true)
</script>

<template>
  <main>
    {{ show }}
    <Child v-model:show="show"></Child>
  </main>
</template>
