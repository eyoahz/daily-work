<script setup lang="ts">
import VModel from '@/views/v-model/VModel.vue'
import { ref } from 'vue'

const show = ref<boolean>(false)

const handle = (flag: boolean) => {
  show.value = flag
  console.log('触发')
}
</script>

<template>
  <main>
    <button @click="() => handle(true)">防抖</button>
    <button @click="() => handle(false)">节流</button>
    <!--<VModel v-model:show="show"></VModel>-->
    <VModel>
      <template v-slot="{ data }">
        {{ data.hobby }}
      </template>
      <template #test="{ data }">
        {{ data.name + data.age }}
      </template>
    </VModel>
  </main>
</template>
