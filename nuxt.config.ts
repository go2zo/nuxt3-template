import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/styles/main.css'],
  components: [
    '~/components',
    { path: '~/components/atoms', pathPrefix: false },
    { path: '~/components/molecules', pathPrefix: false },
    //   { path: '~/components/organisms', pathPrefix: false },
    //   { path: '~/components/templates', pathPrefix: false },
    { path: '~/components/app', pathPrefix: false },
  ],
  modules: ['@nuxt/content', 'nuxt-windicss'],
});
