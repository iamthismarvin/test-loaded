import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  modules: ['@nuxtjs/eslint-module'],
  css: ['@/assets/css/main.css'],
})
