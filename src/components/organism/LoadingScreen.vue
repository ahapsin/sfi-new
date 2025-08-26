<template>
  <div :class="{ loader: true, fadeout: true }" class=" w-full h-full z-50">
    <div class="flex flex-col gap-4 items-center justify-center bg-white h-full">
      <img :src="applogo" width="64px" height="64px" class="animate-pulse"/>
      <n-spin size="small" :stroke="appAccentColor"/>
    </div>
  </div>
</template>
<script setup>
const applogo=import.meta.env.VITE_APP_LOGO;
const appAccentColor=import.meta.env.VITE_APP_ACCENT_COLOR;
</script>
  <style scoped>
.fadeout {
  animation: fadeout 1s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
  