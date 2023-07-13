<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive<Record<string, any>>({
  name: '小黑',
  age: 18,
  sex: 'male',
  hobby: 'soccer',
})
</script>

<template>
  <div>测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽测试具名插槽</div>
  <slot name="test" :data="data" />
  <slot :data="data" />

  <el-tabs>
    <el-tab-pane label="User" name="first">
      User
    </el-tab-pane>
    <el-tab-pane label="Config" name="second">
      Config
    </el-tab-pane>
    <el-tab-pane label="Role" name="third">
      Role
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss"></style>
