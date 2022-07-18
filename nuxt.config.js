const createSitemapRoutes = async () => {
  let routes = [];
  const { $content } = require("@nuxt/content");
  let posts = await $content().fetch();
  for (const post of posts) {
    routes.push(post.slug);
  }
  return routes;
};

const createFeedBlog = async (feed) => {
  const baseUrlBlog = process.env.BASE_URL;
  const { $content } = require("@nuxt/content");

  feed.options = {
    title: "The blog title",
    description: "The blog description",
    link: baseUrlBlog,
    language: "en",
  };

  const posts = await $content().fetch();
  posts.forEach((post) => {
    const url = baseUrlBlog + post.slug;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.summary,
      date: new Date(post.createdAt),
    });
  });
};

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
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
        content: process.env.BASE_URL + "images/bg.png",
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

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content", "@nuxtjs/feed", "@nuxtjs/sitemap"],

  router: {
    mode: "abstract", // HOTFIX: Double back issue, check: https://github.com/nuxt/nuxt.js/issues/9111
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    liveEdit: false, // Remove live editing of files
  },

  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
    routes: createSitemapRoutes,
  },

  feed: [
    {
      path: "/feed.xml",
      create: createFeedBlog,
      cacheTime: 1000 * 60 * 15,
      type: "rss2",
    },
    {
      path: "/feed.json",
      create: createFeedBlog,
      cacheTime: 1000 * 60 * 15,
      type: "json1",
    },
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
