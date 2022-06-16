<template>
  <header>
    <div
      class="flex items-center h-full px-1 mx-auto max-w-7xl sm:px-3 lg:px-6">
      <NavigationButton aria-label="mobileMenu" class="w-12 h-12 lg:hidden" />

      <div class="flex items-center flex-1 justify-center lg:justify-start">
        <Link to="/" aria-label="homeLink">
          <Logo class="h-8 md:h-9" />
        </Link>
      </div>

      <nav class="items-center hidden h-full lg:flex gap-4">
        <ClientOnly>
          <NuxtLink
            v-for="(link, index) in links"
            :key="index"
            :to="link._path || link.to"
            class="font-medium px-2 py-1">
            {{ link.title }}
          </NuxtLink>
        </ClientOnly>
      </nav>

      <div class="flex items-center justify-end gap-1 lg:flex-1">
        <GitHubButton />
        <ColorSwitcher class="hidden lg:block" padding="p-3" />
      </div>
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
