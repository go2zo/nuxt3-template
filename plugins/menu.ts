export default defineNuxtPlugin((nuxtApp) => {
  const visible = ref(false);
  const currentTab = ref();
  const open = () => (visible.value = true);
  const close = () => (visible.value = false);
  const toggle = () => (visible.value = !visible.value);
  const toggleTab = (tab) =>
    currentTab.value === tab
      ? (currentTab.value = undefined)
      : (currentTab.value = tab);

  useRouter()?.afterEach(() => setTimeout(close, 50));

  if (process.client) {
    watch(
      visible,
      (isVisible) => {
        if (isVisible) {
          const scrollBarGap =
            window.innerWidth - document.documentElement.clientWidth;
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollBarGap}px`;
        } else {
          setTimeout(() => {
            document.body.style.overflow = null;
            document.body.style.paddingRight = null;
          }, 16);
        }
      },
      {
        immediate: true,
      }
    );
  }

  nuxtApp.provide('menu', {
    visible,
    close,
    open,
    toggle,
    currentTab,
    toggleTab,
  });
});
