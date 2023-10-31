<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: Boolean,
})

// const emits = defineEmits(['update:show'])


</script>

<template>
  <teleport to='body'>
    <!-- 遮罩 -->
    <div class="mask" v-if="show" @click="$emit('update:show', false)">
      <el-button type="primary" @click="$emit('update:show', false)">关闭</el-button>
    </div>
  </teleport>
</template>

<style scoped>
  .mask {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: grid;
    place-items: center;
  }
</style>
