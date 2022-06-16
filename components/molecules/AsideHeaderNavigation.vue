<template>
  <nav ref="nav" class="flex flex-col gap-1 py-4 px-4 sm:px-6">
    <ClientOnly>
      <NuxtLink
        v-for="(link, index) in links"
        :key="index"
        :to="link.to"
        class="font-medium my-1 py-1"
        :class="{ 'text-primary': isActive(link) }"
        @click="toggle">
        {{ link.title }}
      </NuxtLink>
    </ClientOnly>
  </nav>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types';

const props = withDefaults(
  defineProps<{
    links: NavItem[];
  }>(),
  {
    links: () => [],
  }
);

const { $menu } = useNuxtApp();
const route = useRoute();
const currentSlug = computed(() => {
  if (route.path === '/') {
    return;
  }

  if (typeof route.params?.pathMatch === 'string') {
    return route.params.pathMatch.split('/')[0];
  } else if (Array.isArray(route.params?.pathMatch)) {
    return route.params.pathMatch[0].split('/')[0];
  }

  return null;
});

const nav = ref(null);
const openedLink = ref(null);

const selectActiveLink = () => {
  if (currentSlug.value) {
    for (const [index, link] of props.links.entries()) {
      if (
        link.slug === currentSlug.value ||
        link.items?.some((item) => item.slug === currentSlug.value)
      ) {
        openedLink.value = index;
        break;
      }
    }
  } else {
    openedLink.value = null;
  }
};

selectActiveLink();

watch($menu.visible, (value) => {
  if (value) {
    selectActiveLink();
  }
});

const toggle = (index) => {
  if (openedLink.value === index) {
    openedLink.value = null;
  } else {
    openedLink.value = index;
  }
};

const isActive = (link) => `/${currentSlug.value}` === link.to;
</script>
