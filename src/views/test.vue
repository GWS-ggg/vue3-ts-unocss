<script setup lang="ts">
import { ElMessage } from 'element-plus'

function open4() {
  ElMessage.error('Oops, this is a error message.')
}
</script>

<template>
  <el-button
    :plain="true"
    @click="open4"
  >
    Error
  </el-button>
</template>
