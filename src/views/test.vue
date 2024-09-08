<script setup lang="ts"></script>

<template>
  <div>
    <h2>home</h2>
    <div class="i-ic:baseline-menu h-[1em] w-[1em]" style="color: white;" />
    <div class="i-ic:baseline-menu h-[1em] w-[1em]" style="color: black;" />
    <i-ep-edit />
    <el-icon :size="20">
      <i-ep-edit />
    </el-icon>;
    <el-icon :size="20" color="hotpink">
      <i-ep-edit />
    </el-icon>
    <el-icon name="some-icon-name" />
    <h2>11</h2>
    <el-text class="mx-1">
      Default
    </el-text>
    <el-text class="mx-1" type="primary">
      Primary
    </el-text>
    <el-text class="mx-1" type="success">
      Success
    </el-text>
    <el-text class="mx-1" type="info">
      Info
    </el-text>
    <el-text class="mx-1" type="warning">
      Warning
    </el-text>
    <el-text class="mx-1" type="danger">
      Danger
    </el-text>
  </div>
</template>
