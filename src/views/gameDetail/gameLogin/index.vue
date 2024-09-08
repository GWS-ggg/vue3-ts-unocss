<script setup lang="ts">
const emit = defineEmits(['onCloseLogin'])

function handleClose() {
  emit('onCloseLogin')
}
</script>

<template>
  <div class="w-450 rounded-16 text-16">
    <div class="h-45">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-15 top-13 z-10 h-24 w-24 cursor-pointer" @click="handleClose">
        <circle opacity="0.08" cx="12" cy="12" r="12" fill="#333" />
        <g stroke="#666" stroke-width="2" stroke-linecap="round"><path d="m8.691 15.531 7.071-7.07M8.691 8.469l7.071 7.07" /></g>
      </svg>
    </div>

    <div class="mx-20 my-20 h-400 flex flex-col">
      <div class="mb-29 f-c">
        <img class="h-87 w-80" src="https://static.lilithgame.com/p/park-user-portal-web/1.7.1/lilithcn.svg" alt="">
      </div>
      <div class="content">
        <div class="mb-12 text-center text-26 font-semibold leading-35">
          请您输入角色UID
        </div>
        <div class="mb-20 f-c">
          <input id="UIDinput" class="w-[80%] border border-[#ced4da] rounded-12 border-solid px-10 py-5 text-16" type="text" name="uid" title="只能输入数字!" placeholder="请您输入角色UID">
        </div>
        <div class="mt-20 w-full f-c">
          <button type="submit" class="h-40 w-[90%] border-red rounded-12 border-solid border-solid bg-red">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
