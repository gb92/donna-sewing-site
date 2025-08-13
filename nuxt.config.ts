export default defineNuxtConfig({
  compatibilityDate: "2025-08-12",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/color-mode"],

  // App configuration
  app: {
    head: {
      title: "Portfolio - NWA",
      titleTemplate: "%s - NWA",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Creative technologist",
        },
      ],
    },
  },

  // Content module configuration
  content: {
    highlight: {
      theme: "github-dark",
    },
    markdown: {
      anchorLinks: false,
    },
  },

  // Color mode configuration
  colorMode: {
    preference: "system",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  // CSS configuration
  css: ["~/assets/css/main.css"],

  // SSG configuration for static generation
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },

  // Disable problematic features for static generation
  ssr: true,
});
