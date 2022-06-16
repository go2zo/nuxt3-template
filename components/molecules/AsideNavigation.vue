<template>
  <nav
    class="flex flex-col justify-start max-w-sm overflow-y-auto text-sm font-medium lg:h-[reset] h-(full-header) py-4 px-4 sm:px-6 lg:pr-0 lg:pt-8">
    <!-- Title -->
    <h5
      v-if="breakpoints.isSmaller('md') && title"
      class="m-0 py-2 font-medium text-base uppercase">
      {{ title }}
    </h5>
    <!-- Links list -->
    <ul>
      <template v-for="link in links" :key="link.to">
        <AsideNavigationItem
          v-if="link.nested !== false && link.children?.length"
          :key="link.to"
          :title="link.title"
          :docs="link.children"
          :collapse="link.collapse" />
        <AsideNavigationItem v-else :docs="[link]" />
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const { path } = useRoute();
const { data: currentNav } = await useAsyncData(`current-nav-${path}`, () =>
  queryContent().where({ _path: path }).findOne()
);

const title = ref(currentNav.value.title);
const links = ref(currentNav.value.links);

watch(
  currentNav,
  (newVal) => {
    title.value = newVal.title;
    links.value = newVal.links;
  },
  { deep: true }
);
</script>
