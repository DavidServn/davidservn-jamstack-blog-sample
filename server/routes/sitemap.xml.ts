import { serverQueryContent } from '#content/server'
import { SitemapStream, streamToPromise } from 'sitemap'

export default defineEventHandler(async (e) => {
  const baseUrl = process.env.BASE_URL ?? '';

  const content = await serverQueryContent(e)
    .only(['_path'])
    .find();

    const sitemap = new SitemapStream({
    hostname: baseUrl
  })

  // Add nuxt/content routes
  for (const post of content) {
    sitemap.write({
      url: post._path,
      changefreq: 'weekly'
    })
  }

  // Add static routes
  sitemap.write({
    url: baseUrl,
    changefreq: 'weekly'
  })

  sitemap.end()

  setResponseHeader(e, "Content-Type", "application/xml");
  return streamToPromise(sitemap)
})