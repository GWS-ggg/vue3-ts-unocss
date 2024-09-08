<script lang="ts" setup>
interface Game {
  image: string
  title: string
}

const activeIndex = ref('1')
function handleSelect(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
// function toggleMenu() {
//   isMenuVisible.value = !this.isMenuVisible.value
// }
const games = ref<Game[]>([
  { image: '/src/assets/images/game3_files/1_cn.png', title: '游戏1' },
  { image: '/src/assets/images/game3_files/2_cn.png', title: '游戏2' },
  { image: '/src/assets/images/game3_files/3_cn.png', title: '游戏3' },
])

const selectedLanguage = ref('zh-cn')

const LanguageOptions = [
  {
    value: 'zh-cn',
    label: '中文',
  },
  {
    value: 'en',
    label: '英文',
  },
]
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="p-[0]!" height="50">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col :span="8">
            <el-menu
              :default-active="activeIndex"
              theme="dark"
              unique-opened
              class="el-menu-vertical-demo custom-menu"
              mode="horizontal"
              background-color="#000000"
              text-color="#fff"
              active-text-color="#ffd04b"
              :show-arrow="false"
              @select="handleSelect"
            >
              <el-sub-menu index="2">
                <template #title>
                  <div class="i-ic:baseline-menu h-20 w-20" style="color: white;" />
                </template>
                <el-menu-item index="2-1">
                  item one
                </el-menu-item>
                <el-menu-item index="2-2">
                  item two
                </el-menu-item>
                <el-menu-item index="2-3">
                  item three
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-col>
          <el-col :span="8">
            <div class="h-30">
              <img class="h-full" src="https://lilithimage.lilithcdn.com/official-web-lilith/lilith-logo_cn%403x.png" alt="">
            </div>
          </el-col>
          <el-col :span="8">
            <div class="f-e pr-10 color-[#fff]">
              <el-select
                v-model="selectedLanguage"
                placeholder="Select"
                style="width: 120px"
                class="custom-select"
                :teleported="false"
              >
                <el-option
                  v-for="item in LanguageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  class="custonm-option"
                />
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main class="p-[0]!">
        <div class="block text-center">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in games" :key="item">
              <img :src="item.image" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.el-header {
  text-align: center;
  background-color: #000000;
}
.el-menu--horizontal.el-menu {
    border-bottom: none;
}
.el-menu--horizontal {
  --el-menu-horizontal-height: 50px;
}
.custom-menu :deep(.el-sub-menu .el-sub-menu__icon-arrow)  {
  display: none !important; /* 隐藏下拉图标 */
}
.custom-select {

  position: relative;
  :deep(.el-select__placeholder) {
    color:#fff
  }
  :deep(.el-select__wrapper) {
  background-color: #000000;
  box-shadow: none;
}

/* 去掉右侧下拉图标 */
:deep( .el-select__suffix ) {
    display: none;
}
/* 去掉边框 */
:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: none;
}
:deep(.el-select-dropdown__item.is-selected) {
  color:#fff;
  background-color: #000000
 }

}

:deep(.el-select__popper.el-popper) {
  border:none;
  box-shadow: none
}
:deep(.el-select-dropdown ){
  position: absolute; /* 设置下拉框为绝对定位 */
  top: -5px; /* 删除空隙*/
  z-index: 1000; /* 确保下拉框在其他元素之上 */
  background: #000000;
}
:deep(.el-popper__arrow) {
  display: none; /* 隐藏小三角图标 */
}
</style>
