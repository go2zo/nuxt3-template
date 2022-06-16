<template>
  <div class="relative w-full">
    <AppHeader :links="nav.links" />
    <div class="lg:flex" :class="containerClass">
      <slot v-if="breakpoints.isSmaller('md')" name="aside">
        <AppAside :links="nav.links" />
      </slot>
      <div
        class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
        <slot />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const { $doc } = useNuxtApp();
const breakpoints = useBreakpoints(breakpointsTailwind);

// const { data: header } = await useAsyncData('header', () =>
//   queryContent('/_collections/header').only(['links']).findOne()
// );

const nav = useNavigation();
const layout = computed(() => $doc.layout);

const containerClass = computed(() => {
  if (layout.value.aside) {
    return layout.value.fluid ? 'd-container-fluid' : 'd-container';
  }
  return '';
});
</script>
