<template>
  <header>
    <div>
      <nav>
        <ClientOnly>
          <NuxtLink
            v-for="(link, index) in links"
            :key="index"
            :to="link._path || link.to">
            {{ link.title }}
          </NuxtLink>
        </ClientOnly>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types';

withDefaults(
  defineProps<{
    links: NavItem[];
  }>(),
  {
    links: () => [],
  }
);
</script>
