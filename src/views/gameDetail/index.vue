<script setup lang="ts">
import { useRouter } from 'vue-router'
import FooterContainer from '@/components/footer/index.vue'
// 动态调整根元素的字体大小
function setRemUnit() {
  const html = document.documentElement
  const width = html.clientWidth
  const baseSize = 100 // 基准字体大小
  const maxWidth = 750 // 最大屏幕宽度
  const maxWidthPC = 1920 // PC端最大屏幕宽度

  const screenWidth = window.innerWidth
  let fontSize = baseSize / maxWidth * width
  // 根据屏幕宽度计算字体大小
  if (screenWidth > 1024) {
    fontSize = baseSize / maxWidthPC * width
  }

  // 设置根元素的字体大小
  html.style.fontSize = `${fontSize}px`
}
onMounted(() => {
  // 初始化
  setRemUnit()

  // 监听窗口大小变化
  window.addEventListener('resize', setRemUnit)
})

const linkVisible = ref<boolean>(false)
function handleLinkClick() {
  linkVisible.value = !linkVisible.value
}

const languageVisible = ref(false)
function handlelanguageClick() {
  languageVisible.value = !languageVisible.value
}

// 路由跳转
const router = useRouter()
function navigationToPayHub() {
  router.push('/payDetail/xxx')
}
</script>

<template>
  <div class="default">
    <div class="wrapper" lg="wrapperPC">
      <section class="kv part">
        <div class="kv_top">
          <a class="kv_logo" href="javascript:;">
            <img src="@/assets/images/detail/kv_logo.png" alt=""></a>
          <div class="kv_r">
            <div class="kv_btn2">
              <ul class="lang-menu kv_ul">
                <li data-lang="zh_TW">
                  繁體中文
                </li>
                <li data-lang="en">
                  English
                </li>
                <li data-lang="ar">
                  العربية
                </li>
                <li data-lang="de">
                  Deutsch
                </li>
                <li data-lang="es">
                  Español
                </li>
                <li data-lang="fr">
                  Français
                </li>
                <li data-lang="id">
                  Bahasa Indonesia
                </li>
                <li data-lang="it">
                  Italiano
                </li>
                <li data-lang="pl">
                  Polski
                </li>
                <li data-lang="pt_BR">
                  Português
                </li>
                <li data-lang="ru">
                  Русский
                </li>
                <li data-lang="th">
                  ภาษาไทย
                </li>
                <li data-lang="tr">
                  Türkçe
                </li>
                <li data-lang="vi">
                  Tiếng Việt
                </li>
              </ul>
            </div>
            <div
              target="_blank"
              class="kv_btn kv_purchase cursor-pointer" @click="navigationToPayHub"
            />
            <div class="kv_btn">
              <span data-lilac="" data-lilac-key-="pro3">PLAY NOW!</span>
              <div class="kv_ul">
                <a class="ioslink" target="_blank" href="https://apps.apple.com/us/app/call-of-dragons/id1605558677">
                  <img src="https://onestop.63cj.com/locRes?id=apple&amp;lang=default&amp;name=samo_2" alt="">
                </a>
                <a
                  class="anlink" target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.farlightgames.samo.gp"
                >
                  <img src="https://onestop.63cj.com/locRes?id=google&amp;lang=default&amp;name=samo_2" alt="">
                </a>
                <a class="kv_down3" href="javascript:;">
                  <img src="@/assets/images/detail/kv_down2.png" alt="">
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="m_kv_top">
          <div class="kv_logo">
            <img block w-full src="@/assets/images/detail/kv_logo.png" alt="">
          </div>
          <div class="kv_purchase kv_btn" @click="navigationToPayHub" />
          <div class="kv_btn m_kv_btn" :class="{ ' on ': linkVisible }" @click="handleLinkClick">
            <span>PLAY NOW!</span>
            <div class="kv_ul m_kv_ul">
              <a href="#" class="ioslink">
                <img w-full src="https://onestop.63cj.com/locRes?id=apple&lang=default&name=samo_2" alt="">
              </a>
              <a href="#" class="anlink">
                <img w-full src="https://onestop.63cj.com/locRes?id=google&lang=default&name=samo_2" alt="">
              </a>
              <a href="#" class="kv_down3">
                <img w-full src="@/assets/images/detail/kv_down2.png" alt="">
              </a>
            </div>
          </div>
          <div class="kv_left">
            <a href="javascript:;" class="btn-slide">
              <i class="draw" title="" />
            </a>
            <div class="lang-box kv_lanuage" :class="{ ' on ': languageVisible }" @click="handlelanguageClick">
              <ul class="lang-menu m_lanuage">
                <li data-lang="zh_TW">
                  繁體中文
                </li>
                <li data-lang="en">
                  English
                </li>
                <li data-lang="ar">
                  العربية
                </li>
                <li data-lang="de">
                  Deutsch
                </li>
                <li data-lang="es">
                  Español
                </li>
                <li data-lang="fr">
                  Français
                </li>
                <li data-lang="id">
                  Bahasa Indonesia
                </li>
                <li data-lang="it">
                  Italiano
                </li>
                <li data-lang="pl">
                  Polski
                </li>
                <li data-lang="pt_BR">
                  Português
                </li>
                <li data-lang="ru">
                  Русский
                </li>
                <li data-lang="th">
                  ภาษาไทย
                </li>
                <li data-lang="tr">
                  Türkçe
                </li>
                <li data-lang="vi">
                  Tiếng Việt
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="kv_slogan">
          <div>
            <p class="kv_slogan1" data-lilac="" data-lilac-key-="home1">
              Heroes Unite. Battle for a Fantasy Realm!
            </p>
          </div>
          <div>
            <p class="kv_slogan2" data-lilac="" data-lilac-key-="home33">
              An MMO Fantasy Conquest Game
            </p>
            <p class="kv_slogan2" data-lilac="" data-lilac-key-="home34">
              BY THE ROK TEAM
            </p>
          </div>
        </div>
        <div class="m_kv_desc">
          <img src="https://onestop.63cj.com/locRes?id=m_slogan&amp;lang=default&amp;name=samo_2" alt="">
        </div>
        <div class="kv_down">
          <div class="pluto-mall">
            <div class="btn-pluto-title" />
            <a href="https://store.farlightgames.com/cod?shortlink=codg.int.web.os.ce.def" target="_blank">
              <img class="btn-pluto-mall" src="/src/assets/images/detail/kv_plutomall.png" alt="">
            </a>
          </div>
          <a target="_blank" href="https://apps.apple.com/us/app/call-of-dragons/id1605558677">
            <img src="https://onestop.63cj.com/locRes?id=apple&amp;lang=default&amp;name=samo_2" alt="">
          </a>
          <a target="_blank" href="https://play.google.com/store/apps/details?id=com.farlightgames.samo.gp">
            <img src="https://onestop.63cj.com/locRes?id=google&amp;lang=default&amp;name=samo_2" alt="">
          </a>
          <a class="kv_down3 ml-3" href="javascript:;" />
        </div>
      </section>
      <section class="part bg5">
        <div class="part5_link">
          <i class="bottom_l fadeInLeft ani" />
          <div class="link_li">
            <a
              class="fblink" target="_blank" href="https://www.facebook.com/callofdragons"
              onclick="gtag('event', 'facebook');"
            />
            <a
              class="dclink" target="_blank" href="https://discord.gg/Pub3fg535h"
              onclick="gtag('event', 'discord');"
            />
            <a
              class="twlink" target="_blank" href="https://twitter.com/callofdragons"
              onclick="gtag('event', 'twitter');"
            />
            <a
              class="ytlink" target="_blank" href="https://www.youtube.com/channel/UCMTqr8lzoTFO_NtPURyPThw"
              onclick="gtag('event', 'youtube');"
            />
            <a
              class="rdlink" target="_blank" href="https://www.reddit.com/r/callofdragons/"
              onclick="gtag('event', 'Reddit');"
            />
            <a
              class="inslink" target="_blank" href="https://www.instagram.com/callofdragonsofficial/"
              onclick="gtag('event', 'Instagram');"
            />
            <a
              class="ttlink" target="_blank" href="https://www.tiktok.com/@callofdragonsgame"
              onclick="gtag('event', 'tiktok');"
            />
            <a target="_blank" href="https://vk.com/callofdragons" />
          </div>
          <i class="ani bottom_r fadeInRight" />
        </div>
      </section>
    </div>
  </div>
  <FooterContainer />
</template>

<style lang="less" scoped>
.wrapperPC {
  position: relative;
  z-index: 7;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  opacity: 1;
  transition: all 0.5s;
}

.wrapper {
  // 文本不可选择
  -webkit-text-size-adjust: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

@media (max-width: 1024px) {

  img {
    width: 100%;
  }

  fieldset,
  img,
  abbr,
  acronym {
    border: 0
  }

  ol,
  ul {
    list-style: none;
  }

  a:hover,
  a:active,
  a:link,
  a:visited,
  a:focus {
    text-decoration: none;
    outline: none;
  }
  .right {
        display: none;
    }
  .part {
    position: relative;
    overflow: hidden;
    margin-top: -0.01rem;
    width: 100%;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: cover
  }

  .kv {
    background-image: url('https://lilithimage.lilithcdn.com/pub/common/base/m_kv.jpg');
    height: 13rem;
  }

  .kv_top {
    display: none !important;
  }

  .m_kv_top {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    width: 7.5rem;
    height: 0.87rem;
    background: url(/src/assets/images/detail/kv_top.png) no-repeat center / 100%;
    box-sizing: border-box;

  }

  .kv_logo {
    width: 1.78rem;
    height: 0.53rem;
  }

  .kv_btn {
    margin-left: 0.1rem;
    width: 1.83rem;
    height: 0.55rem;
    font-size: 0.2rem;
    font-family: "bold2", sans-serif;
    text-align: center;
    color: #000;
    /* 添加通用字体系列关键字 */
    background: url('/src/assets/images/detail/kv_btn.png') no-repeat center / 100%;
    line-height: 0.55rem;
    font-weight: bold;
  }

  .kv_purchase {
    background: url('/src/assets/images/detail/kv_purchase.png') no-repeat;
    background-position: 0 -0.05rem;
    background-size: 1.83rem 0.54rem;
  }

  .m_kv_ul {

    position: fixed;
    top: 0.8rem;
    left: 0;
    padding-top: 0.5rem;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 76%);
    opacity: 0;
    visibility: hidden;

    a {
      display: block;
      margin: 0.2rem auto;
      width: 3rem;
      height: auto;
    }
  }

  .m_kv_btn.on .m_kv_ul {
    opacity: 1;
    visibility: initial;
  }

  .kv_left {
    display: flex;
    align-items: center;
  }

  .btn-slide {
    position: relative;
    margin-right: 0.1rem;
    width: 0.58rem;
    height: 0.83rem;
    color: #000;
    background-position: 0 -1.11rem;
    outline: none;
  }

  .draw {
    top: 50%;
    left: 0.44rem;
    margin-top: -0.01rem;
  }

  .draw:before {
    content: "";
    top: -0.12rem;
  }

  .draw:after {
    content: "";
    top: 0.12rem;
  }

  .draw,
  .draw:before,
  .draw:after {
    position: absolute;
    left: 0;
    width: 0.4rem;
    height: 0.04rem;
    background: #d1cac3;
    transition: all .5s;
    transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
  }

  .kv_lanuage {
    width: 0.4rem;
    height: 0.4rem;
    background: url('/src/assets/images/detail/kv_lanuage.png') no-repeat center / 100%;
  }

  .lang-menu {
    position: absolute;
    top: 0.8rem;
    right: 2.05rem;
    right: 0;
    left: auto;
    z-index: 9;
    display: flex;
    width: 2.25rem;
    height: auto;
    background: rgb(17 17 17 / 64%);
    border-radius: 0.05rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
    flex-flow: column;

    li {
      padding-left: 0.25rem;
      height: 0.55rem;
      font-size: 0.2rem;
      color: #fff;
      line-height: 0.55rem;
      border-bottom: 0.01rem solid #373735;
      cursor: pointer;
    }
  }

  .kv_lanuage.on .lang-menu {
    opacity: 1;
    visibility: visible;
  }

  .kv_slogan {
    position: relative;
    z-index: 9;
    margin: 1.3rem auto 0;
    font-size: 0.28rem;
    font-family: 'bold';
    text-align: center;
    color: #fff;
  }

  .kv_slogan1 {
    display: none;
  }

  .kv_slogan2 {
    display: block;
  }

  .m_kv_desc {
    position: relative;
    z-index: 9;
    margin: 5.05rem auto 1rem;
    width: 7.5rem;
    height: auto;
    font-size: 0.78rem;
    font-family: 'bold';
    text-align: center;
    color: #fff;
    animation-delay: 1.5s;
    line-height: 0.88rem;

    img {
      width: 100%;
    }
  }

  .kv_down {
    position: absolute;
    top: 10.5rem;
    left: 50%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    transform: translateX(-50%);

    .pluto-mall {
      position: relative;

      .btn-pluto-title {
        position: absolute;
        top: -0.75rem;
        left: 0;
        z-index: 11;
        width: 3rem;
        height: 0.95rem;
        background: url('/src/assets/images/detail/kv_down_title_en.png') 0 0 no-repeat;
        background-size: auto 100%;
      }

      .btn-pluto-mall {
        width: auto;
        height: 0.85rem;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.3rem;
      margin-bottom: 0.3rem;
      width: auto;
      height: 0.85rem;

      img {
        width: auto;
        height: 0.85rem;
      }
    }

    a:nth-of-type(2) img {
      margin-left: 0.05rem;
      height: 1.08rem;
    }

    a:nth-of-type(3) {
      width: 2.6rem;
      height: 0.85rem;
      text-align: left;
      text-indent: 9999px;
      background: url('/src/assets/images/detail/kv_down2.png') 0 0 no-repeat;
      background-size: auto 100%;
    }
  }

  .wrapper.noOfficial .pluto-mall,
  .wrapper.noOfficial .kv_purchase {
    display: block !important;
  }

  .bg5 {
    background-image: url(https://lilithimage.lilithcdn.com/pub/common/base/bg5.jpg);
    height: 3.5rem;
    background-position: bottom;
  }

  .part5_link {
    position: relative;
    // margin-top: 5rem;
  }

  .link_li {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 4.85rem;
    height: 3.55rem;
    flex-wrap: wrap;

    a {
      margin: 0 0.05rem;
      margin-bottom: 0.5rem;
      width: 1.05rem;
      height: 1.45rem;
      background-position: 0 0;
      background-size: 4.53rem 3.55rem;
      background-image: url('/src/assets/images/detail/footer_btn.png');
    }

    a:nth-of-type(2) {
      // width: 0.9rem;
      background-position: -1.7rem 0;
    }

    a:nth-of-type(3) {
      // width: 0.9rem;
      background-position: -3.45rem 0;
    }

    a:nth-of-type(4) {
      width: 0.95rem;
      background-position: 0 -2.1rem;
    }

    a:nth-of-type(5) {
      background: url('/src/assets/images/detail/part5_btn3.png') no-repeat center / contain;
    }

    a:nth-of-type(6) {
      width: 1.08rem;
      background-position: -3.45rem -2.1rem;
    }

    a:nth-of-type(7) {
      background-position: -1.7rem -2.1rem;
    }

    a:nth-of-type(8) {
      display: none;
    }
  }
}

@media (min-width: 1025px) {

  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  form,
  fieldset,
  input,
  textarea,
  p,
  blockquote,
  th,
  td {
    padding: 0;
    margin: 0;
    -webkit-text-size-adjust: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  a {
    text-decoration: none;
    outline: none;
  }

  img {
    width: 100%;
  }

  fieldset,
  img,
  abbr,
  acronym {
    border: 0;
  }

  .default {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    font-size: 0.2rem;
    font-family: "font", "Microsoft Yahei", sans-serif;
    /* 添加通用字体系列关键字 */
    background-color: #181713;
    box-sizing: border-box;
  }

  .wrapper {
    position: relative;
    z-index: 7;
    width: 100%;
    height: 100%;
    transform-origin: 0 0;
    opacity: 1;
    transition: all 0.5s;
  }

  .right {
    position: fixed;
    top: 50%;
    right: 0.05rem;
    z-index: 99;
    width: 2rem;
    height: 0.6rem;
    transform: translateY(-50%);
  }

  .part {
    position: relative;
    overflow: hidden;
    margin-top: -0.01rem;
    width: 19.2rem;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .kv {
    background-image: url(https://lilithimage.lilithcdn.com/pub/common/base/kv.jpg);
    height: 9.47rem;
  }

  .m_kv_top,
  .com_nav {
    display: none !important;
  }

  .kv_top {
    position: fixed;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.28rem;
    width: 19.2rem;
    height: 0.83rem;
    background: url('/src/assets/images/detail/kv_top.png') no-repeat center / 100%;
    transition: all 0.5s;
    box-sizing: border-box;
  }

  .kv_logo {
    width: 1.78rem;
    height: 0.53rem;
  }

  .kv_r {
    display: flex;
    align-items: center;

  }

  .kv_btn2 {
    position: relative;
    display: block;
    margin-right: 0.2rem;
    width: 0.3rem;
    height: 0.3rem;
    background: url('@/assets/images/detail/kv_btn2.png') no-repeat center / 100%;
  }

  .kv_btn2:hover .lang-menu {
    opacity: 1;
    visibility: visible;
  }

  .lang-menu li:hover,
  .lang-menu li.on {
    color: #d07a15;
  }

  .kv_btn {
    position: relative;
    display: block;
    width: 1.9rem;
    height: 0.54rem;
    font-size: 0.2rem;
    font-family: "bold2", sans-serif;
    text-align: center;
    color: #000;
    background: url('@/assets/images/detail/kv_btn.png') no-repeat right / 1.83rem 0.54rem;
    transition: all 0.5s;
    line-height: 0.54rem;
    font-weight: bold;

    .kv_ul {
      top: 0.65rem;
      left: -0.2rem;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 0.05rem;
        height: 0.8rem;
      }

      img {
        display: block;
        margin: 0 auto;
        width: 1.8rem;
        height: auto !important;
      }
    }
  }

  .kv_purchase {
    display: block !important;
    background: url('@/assets/images/detail/kv_purchase.png') no-repeat;
    background-position: 0 -0.05rem;
    background-size: 1.83rem 0.54rem;
  }

  .kv_ul {
    /* text-align: center; */
    position: absolute;
    top: 0.78rem;
    left: -0.4rem;
    z-index: 9;
    display: flex;
    width: 2.1rem;
    /* padding: 0.1rem 0.2rem; */
    height: auto;
    background: rgb(17 17 17 / 64%);
    border-radius: 0.05rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
    flex-flow: column;

    a {
      padding: 0.05rem 0.2rem;
      height: 0.4rem;
      font-size: 0.2rem;
      color: #fff;
      line-height: 0.4rem;
      border-bottom: 0.01rem solid #373735;
    }

    .kv_ul img {
      width: auto;
      height: 0.08rem !important;
    }
  }

  .kv_btn:hover .kv_ul {
    opacity: 1;
    visibility: inherit;
  }

  .lang-menu {
    top: 0.5rem;
    /* right: -0.2rem; */
    right: -1rem;
    left: auto;
    width: 2.5rem;

    li {
      padding-right: 0.25rem;
      padding-left: 0.25rem;
      height: 0.4rem;
      font-size: 0.2rem;
      color: #fff;
      line-height: 0.4rem;
      border-bottom: 0.01rem solid #373735;
      cursor: pointer;
      direction: rtl;
    }
  }

  .kv_slogan {
    margin: 5.8rem auto 0.25rem;
    width: 10rem;
    font-family: "bold";
    text-align: center;
    color: #fff;

    .kv_slogan1 {
      position: relative;
      display: block;
      font-size: 0.48rem;
    }

    .kv_slogan2 {
      display: none;
    }
  }

  .m_kv_desc {
    display: none;
  }

  .kv_down {
    position: relative;
    z-index: 9;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.45rem auto 0.85rem auto;
    /* width: 4.8rem; */
    width: 10rem;
    height: 0.85rem;

    /* animation-delay: 0.5s; */
    .pluto-mall {
      position: relative;
      display: block !important;
      margin-right: 0.3rem;

      .btn-pluto-mall {
        width: auto;
        height: 0.7rem;
      }

      .btn-pluto-title {
        position: absolute;
        top: -75%;
        left: 0;
        z-index: 9;
        width: 3rem;
        height: .75rem;
        background: url('/src/assets/images/detail/kv_down_title_en.png') 0 0 no-repeat;
        background-size: auto .75rem;
      }
    }

    a {
      position: relative;
      margin: 0 -0.1rem;
      width: auto;
      height: 0.84rem;
      transform: scale(0.8);
    }

    a:nth-of-type(2) {
      height: 1.1rem;
    }

    a:nth-of-type(3) {
      display: flex;
      align-items: center;
      padding-left: 0.95rem;
      margin-left: 0.2rem;
      width: 2.25rem;
      height: 0.85rem;
      font-size: 0.22rem;
      /* font-weight: bold; */
      color: #fff;
      background: url('/src/assets/images/detail/kv_down2.png') no-repeat center / 100%;
      transform: scale(1);
      box-sizing: border-box;
    }

    img {
      width: auto;
      height: 100%;
    }
  }

  .bg5 {
    direction: ltr;
    position: relative;
    background-image:url(https://lilithimage.lilithcdn.com/pub/common/base/part5.jpg);
    height: 3.15rem;
    background-position: center
  }

  .part5_link {
    position: relative;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    margin: 1.0rem auto 0.5rem;
    width: 15.21rem;
    height: 1.24rem;
  }

  .link_li {
    display: flex;
    justify-content: center;
    width: 9.5rem;
    height: 1.24rem;

     a {
      margin: 0 0.2rem;
      width: 0.92rem;
      height: 1.24rem;
      background-size: 15.21rem 1.24rem;
      transition: all 0.5s;
      background-image: url('/src/assets/images/detail/part5_btn.png');
    }

    a:nth-of-type(1) {
      background-position: -3.4rem 0;
    }

    a:nth-of-type(2) {
      background-position: -4.9rem 0;
    }

     a:nth-of-type(3) {
      background-position: -6.4rem 0;
    }

    a:nth-of-type(4) {
      background-position: -7.9rem 0;
    }

     a:nth-of-type(5) {
      background-position: -9.35rem 0;
    }

     a:nth-of-type(6) {
      background-position: -10.9rem 0;
    }

    a:nth-of-type(7) {
      margin-left: 0.28rem;
      width: 0.7rem;
      height: 1.24rem;
      background: url('/src/assets/images/detail/part5_btn2.png') no-repeat center / 100%;
    }

    a:nth-of-type(8) {
      display: none;
    }
  }
}
</style>
