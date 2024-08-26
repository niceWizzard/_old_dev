// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth", "@pinia/nuxt"],
  css: ["~/assets/css/main.css", "primevue/resources/primevue.css"],
  build: {
    transpile: ["primevue"],
  },
  auth: {
    globalAppMiddleware: false,
  },
  runtimeConfig: {
    public: {
      providers: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      },
    },
  },
});
