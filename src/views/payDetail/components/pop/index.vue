<script lang="ts" setup>
import type { Pop } from '@/types/index'

interface Props {
  pop: Pop
}
const _props = withDefaults(defineProps<Props>(), {
  pop: () => {
    return {
      visible: false,
      type: 'success',
      content: '',
      closeable: false,
      defaultBtn: {
        text: '',
        onClick: () => { },
      },
      primaryBtn: {
        text: '',
        onClick: () => { },
      },
    }
  },
})
const emit = defineEmits(['update:visible'])
function handleClose() {
  emit('update:visible', false)
}
</script>

<template>
  <div
    v-if="pop.visible"
    class="pop-container"
  >
    <div class="pop-main">
      <div
        v-if="pop.closeable"
        class="close-btn"
        @click="handleClose"
      />
      <div class="pop-icon">
        <img
          v-if="pop.type === 'success'"
          src="/img/success-icon.png"
        >
        <img
          v-if="pop.type === 'error'"
          src="/img/error-icon.png"
        >
        <img
          v-if="pop.type === 'failed'"
          src="/img/failed-icon.png"
        >
      </div>
      <div class="pop-content">
        {{ pop.content }}
      </div>
      <div class="btns">
        <div
          v-if="pop.defaultBtn"
          class="button btn btn-default"
          @click="() => pop.defaultBtn?.onClick && pop.defaultBtn.onClick()"
        >
          {{ pop.defaultBtn.text }}
        </div>
        <div
          v-if="pop.primaryBtn"
          class="btn button btn-primary"
          @click="() => pop.primaryBtn?.onClick && pop.primaryBtn.onClick()"
        >
          {{ pop.primaryBtn.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pop-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);

  .pop-main {
    position: relative;
    z-index: 10000;
    padding: 66px 50px 50px;
    width: 626px;
    height: 626px;
    background-color: #1c254c;

    .pop-icon {
      display: flex;
      justify-content: center;
      margin-bottom: 47px;
      width: 100%;

      img {
        width: 207px;
        height: 207px;
      }
    }

    .close-btn {
      position: absolute;
      top: 28px;
      right: 28px;
      width: 24px;
      height: 24px;
      background-size: 100%;
      cursor: pointer;
      background-image: url("/img/close-icon.png");
    }

    .pop-content {
      font-size: 30px;
      text-align: center;
      color: #efefef;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
    }

    .btns {
      position: absolute;
      bottom: 50px;
      display: flex;
      justify-content: space-between;
      width: 526px;
      height: 88px;

      .btn {
        width: 100%;
      }

      .btn-default {
        background-color: #687ca4;
      }

      .btn+.btn {
        margin-left: 29px;
      }
    }
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: "Helvetica-Bold", sans-serif;
  color: #efefef;
  background-color: #3a7bfc;
  font-weight: bold;
  font-stretch: normal;
  line-height: 52px;
  letter-spacing: 0px;
  cursor: pointer;
}

.cover-img {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
