export default defineNuxtPlugin((nuxtApp) => {
  const layout = reactive({
    aside: true,
  });

  nuxtApp.provide('doc', {
    layout,
  });
});
