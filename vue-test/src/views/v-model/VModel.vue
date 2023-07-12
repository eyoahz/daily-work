<script lang="ts" setup>
const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits(['update:show'])
</script>

<template>
  <el-dialog :model-value="props.show" @close="emits('update:show', false)"></el-dialog>
</template>

<style scoped lang="scss"></style>
