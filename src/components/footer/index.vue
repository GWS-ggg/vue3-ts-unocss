<script setup lang="ts"></script>

<template>
  <el-footer class="h-auto! p-[0]!">
    <div class="relative m-auto h-auto w-[100vw] bg-[#211d1d] px-20 pb-78 pt-60 text-center">
      <div class="op-[.99999]">
        <img class="mb-10 h-52" src="https://lilithimage.lilithcdn.com/official-web-lilith/lilith-logo_cn%403x.png" alt="">
        <div class="text-12 color-[hsla(0,0%,100%,.4)] no-underline">
          <a href="#" class="no-click-effect">隐私协议   |</a>
          <a href="#" class="no-click-effect">   服务条款   |</a>
          <a href="#" class="no-click-effect">   廉正合规</a>
        </div>
      </div>
    </div>
  </el-footer>
</template>

<style scoped>
.no-click-effect {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 继承父元素的颜色 */
}

.no-click-effect:visited {
  color: inherit; /* 去掉点击后的颜色变化 */
}
</style>
