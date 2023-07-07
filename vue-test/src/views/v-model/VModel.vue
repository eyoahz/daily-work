<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{
    show: boolean
}>();

const emits = defineEmits(['update:show'])

const showRef = ref<boolean>(false);

const showFun = watch(() => props.show, () => {
    console.log('触发！！！！！')
})

</script>

<template>
  <el-dialog :model-value="props.show" @close="emits('update:show', false)"></el-dialog>
</template>

<style scoped lang="scss">

</style>