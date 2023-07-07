<script setup lang="ts">
import VModel from '@/views/v-model/VModel.vue'
import { ref } from 'vue'

const show = ref<boolean>(false);

const handle = (flag: boolean) => {
    show.value = flag;
}

</script>

<template>
  <main>
    <button @click="() => handle(true)">防抖</button>
    <button @click="() => handle(false)">节流</button>
    <!--<VModel v-model:show="show"></VModel>-->
    <VModel v-model:show="show"></VModel>
  </main>
</template>
