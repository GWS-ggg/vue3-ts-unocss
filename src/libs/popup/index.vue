<script setup>
const isVisble = defineModel({ required: true, type: Boolean })
</script>

<template>
  <div>
    <teleport to="body">
      <transition name="mask">
        <div v-if="isVisble" class="fixed left-0 top-0 z-40 h-screen w-screen bg-zinc-700/80" />
      </transition>
      <transition name="popup">
        <div v-if="isVisble" class="fixed bottom-0 z-50 w-screen overflow-hidden rounded-t-24 bg-white">
          <slot />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style scoped>
.mask-enter-active,
.mask-leave-active {
  transition: 0.3s;
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
  transition: 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  transform: translateY(100%);
}
</style>
