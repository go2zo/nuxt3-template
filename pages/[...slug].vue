<template>
  <main>
    <ContentRenderer :value="data">
      <h1>{{ data.title }}</h1>
      <MarkdownRenderer :value="data" />
    </ContentRenderer>
  </main>
</template>

<script setup lang="ts">
const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, () =>
  queryContent().where({ _path: path }).findOne()
);
</script>
