// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@sidebase/nuxt-auth", "@nuxt/ui"],
  auth: {
    provider: {
        type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true,
    }
  },
  runtimeConfig : {
    github: {
      client: '',
      secret: ""
    },
    authSecret: ''
  },
  ui: {
    icons: ['material-symbols']
  }
})