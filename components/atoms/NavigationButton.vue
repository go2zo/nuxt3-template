<template>
  <button
    class="flex items-center transition-colors duration-200 justify-center lg:hidden"
    @click.stop="$menu.toggle">
    <IconMenuAlt class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
const { $menu } = useNuxtApp();
</script>
