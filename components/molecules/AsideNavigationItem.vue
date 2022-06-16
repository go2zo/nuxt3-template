<template>
  <li :class="{ active: isActive }">
    <h5
      v-if="title"
      class="d-aside-title"
      :class="{ 'lg:hover:d-primary-text-hover': !isActive }">
      {{ title }}
    </h5>
    <ul v-if="!collapse" class="mb-2 ml-2">
      <li v-for="doc of docs" :key="doc.to">
        <NuxtLink
          :to="doc.to"
          class="block w-full"
          :class="[
            isLinkActive(doc.to)
              ? 'd-active-aside-navigation-item-text'
              : 'd-secondary-text hover:d-secondary-text-hover',
          ]">
          <span
            class="relative inline-flex items-center justify-between px-2 py-1 rounded-md"
            :class="{
              'd-active-aside-navigation-item-bg': isLinkActive(doc.to),
            }">
            <InjectComponent
              v-if="doc.icon"
              :component="doc.icon"
              class="inline-flex mr-2 w-2 h-5 justify-center items-center text-1.2rem">
              {{ doc.icon }}
            </InjectComponent>

            <span>{{ doc.title }}</span>

            <ClientOnly>
              <span
                v-if="doc.draft"
                class="w-2 h-2 ml-2 bg-yellow-500 rounded-full opacity-75" />
              <span
                v-else-if="isDocumentNew(doc)"
                class="w-2 h-2 ml-2 rounded-full opacity-75 animate-pulse" />
            </ClientOnly>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types';

const props = withDefaults(
  defineProps<{
    title?: string;
    docs: NavItem[];
    collapse?: boolean;
  }>(),
  {
    title: '',
    collapse: false,
  }
);

const { isLinkActive } = useNavigation();
const isActive = computed(() =>
  props.docs.some((document) => isLinkActive(document.to))
);

const isDocumentNew = (document) => {
  if (!process.server) {
    return;
  }

  if (!document.version || document.version <= 0) {
    return;
  }

  const version = localStorage.getItem(`document-${document.slug}-version`);

  if (document.version > Number(version)) {
    return true;
  }

  return false;
};
</script>
