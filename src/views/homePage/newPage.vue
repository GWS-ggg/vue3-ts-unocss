<script setup lang="ts">
// 测试接口请求
import $api from 'Plugins/axios'

// 测试接口请求
import { $authLogin } from 'Api/user'

$api({
  url: window.location.href,
  method: 'get',
}).then((res) => {
  console.log(res)
}) // 这里记得配置路径映射别名

$authLogin({
  username: 'test',
  password: 'test',
}).then((res: any) => {
  console.log(res)
})
</script>

<template>
  <div>HomePage</div>
</template>
