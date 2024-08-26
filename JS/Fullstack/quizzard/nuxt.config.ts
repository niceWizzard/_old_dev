// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth"],
  app: {
    head: {
      title: "Quizzard - Create and share quizzes fast!",
    }
    
  },
  runtimeConfig: {
    app: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      },
      fb: {
        API_KEY: process.env.FB_API_KEY,
        FB_PROJECT_ID: process.env.FB_PROJECT_ID,
        APP_ID: process.env.FB_APP_ID,
        MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID
      }
    }
  },
  auth: {
    isEnabled: true,
  }
})