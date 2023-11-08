// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/styles/main.scss'],
    modules: ['@sidebase/nuxt-auth'],
    ssr: false,
    auth: {
        provider: {
            type: 'local',
        },
    },
})
