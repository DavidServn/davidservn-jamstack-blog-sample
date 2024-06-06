export default defineNuxtConfig({
  // https://nuxt.com/docs/getting-started/deployment
  ssr: true,
  app: {
    // https://nuxt.com/docs/getting-started/seo-meta
    head: {
      title: "DavidServn's Blog",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no",
        },
        {
          hid: "robots",
          name: "robots",
          content: "index,follow",
        },
        {
          hid: "googlebot",
          name: "googlebot",
          content: "index,follow",
        },
        {
          hid: "description",
          name: "description",
          content: "This is my blog.",
        },
        { hid: "og:title", name: "og:title", content: "DavidServn's Blog" },
        {
          hid: "og:description",
          name: "og:description",
          content: "This is my blog.",
        },
        { hid: "og:url", name: "og:url", content: process.env.BASE_URL },
        { hid: "og:type", name: "og:type", content: "website" },
        {
          hid: "og:image",
          name: "og:image",
          content: process.env.BASE_URL + "/images/bg.png",
        },
        {
          hid: "og:image:alt",
          name: "og:image:alt",
          content: "DavidServn's Blog",
        },
        { hid: "og:image:width", name: "og:image:width", content: "2449" },
        { hid: "og:image:height", name: "og:image:height", content: "1632" },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:site", name: "twitter:site", content: "@davidservn" },
        {
          hid: "twitter:creator",
          name: "twitter:creator",
          content: "@davidservn",
        },
        {
          hid: "theme-color",
          name: "theme-color",
          content: "#1b1f22",
        },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: process.env.BASE_URL,
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },
  // https://nuxt.com/docs/getting-started/styling
  css: ["~/assets/css/main.css"],
  // https://nuxt.com/docs/api/nuxt-config#components
  components: true,
  // https://nuxt.com/docs/api/nuxt-config#modules-1
  modules: ["@nuxt/content", "@nuxtjs/sitemap"],
  // https://nuxtseo.com/sitemap/getting-started/installation
  sitemap: {
    sources: [
      '/api/sitemap'
    ]
  },
  nitro: {
    prerender: {
      routes: ['/feed.atom', '/feed.json', '/feed.xml'],
    },
  },
  site: {
    url: process.env.BASE_URL
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    }
  },
})