import { serverQueryContent } from '#content/server'
import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async (e) => {
  const baseUrl = process.env.BASE_URL ?? '';

  const content = await serverQueryContent(e)
    .only(['_path'])
    .find();

  let urls = content.map((c) => { return asSitemapUrl({ loc: `${baseUrl}${c._path}` }) });
  urls.push(asSitemapUrl({ loc: `${baseUrl}` }));

  return urls;
})
