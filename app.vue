<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class:
      'd-body-bg d-body-text-color text-root min-w-base antialiased tracking-semitight d-scrollbar min-w-xs',
  },
});
useColorShade({
  primary: '#00DC82',
  secondary: '#497A87',
  tertiary: '#B2CCCC',
  cloud: '#688282',
  logo: '#003543',
});
</script>
