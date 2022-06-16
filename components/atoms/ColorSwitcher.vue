/* eslint-disable prettier/prettier */
<template>
  <button
    class="d-icon"
    aria-label="Color Mode"
    :class="[padding]"
    @click="next()">
    <ClientOnly>
      <IconSun v-if="mode === 'light'" :class="size" />
      <IconMoon v-if="mode === 'dark'" :class="size" />
      <IconCoffee v-if="mode === 'cafe'" :class="size" />
      <IconContrast v-if="mode === 'contrast'" :class="size" />
      <template #placeholder> ... </template>
    </ClientOnly>
  </button>
</template>

<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core';

withDefaults(
  defineProps<{
    size?: string;
    padding?: string;
  }>(),
  {
    size: 'w-6 h-6',
    padding: 'p-0',
  }
);

const mode = useColorMode({
  modes: {
    contrast: 'dark contrast',
    cafe: 'cafe',
  },
});

const { next } = useCycleList(['dark', 'light', 'cafe', 'contrast'], {
  initialValue: mode,
});

const IconSun = resolveComponent('IconSun');
const IconMoon = resolveComponent('IconMoon');
const IconCoffee = resolveComponent('IconCoffee');
const IconContrast = resolveComponent('IconContrast');
</script>
