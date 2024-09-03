<script setup lang="ts">
// 测试接口请求

// 测试接口请求
import { useI18n } from 'vue-i18n'
import { t } from '../../language/i18n'

const { locale } = useI18n()
function changeLanguage(lang: string) {
  locale.value = lang
}
// $api({
//   url: window.location.href,
// ;;;   method: 'get',
// }).then((res) => {
//   console.log(res)
// }) // 这里记得配置路径映射别名

// $authLogin({
// ;;;   username: 'test',
// ;;;   password: 'test',
// }).then((res: any) => {
//   console.log(res)
// })

// // 测试pinia
// const userStore = useUserStore()
// console.log(userStore.username)
// userStore.authLogin().then((res) => {
//   console.log(res)
// })
</script>

<template>
  <div>HomePage</div>
  <div class="h-full text-center flex select-none all:transition-400">
    <p text-16 px-10 shadow="[0_0_10px_4px_#dedede]">
      iceCode
    </p>
  </div>
  <div class=" border bg-red">
    border
  </div>
  <p>{{ t('message.pageTitle') }} </p>
  <div>
    <button @click="changeLanguage('zh-cn')">
      zh
    </button>

    <button @click="changeLanguage('en')">
      en
    </button>
  </div>
</template>
