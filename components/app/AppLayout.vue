<template>
  <div>
    <AppHeader :links="header?.links || navigation" />
    <div>
      <div>
        <slot />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
const { data: navigation } = await useAsyncData('navigation', () => {
  return fetchContentNavigation();
});
const { data: header } = useAsyncData('header', () =>
  queryContent('/_collections/header').only(['links']).findOne()
);
</script>
