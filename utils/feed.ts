import type { H3Event } from 'h3'
import { Feed } from 'feed'
import { serverQueryContent } from '#content/server'

export async function getFeed(e: H3Event): Promise<Feed> {
  const baseUrl = process.env.BASE_URL ?? '';

  const content = await serverQueryContent(e)
    .only(['_path', 'title', 'description', 'createdAt'])
    .find();

  const feed = new Feed({
    id: baseUrl,
    title: "DavidServn's Blog",
    description: "DavidServn's Blog Description",
    link: baseUrl,
    language: "en",
    image: baseUrl + "/images/bg.png",
    favicon: baseUrl + "/favicon-32x32.png",
    copyright: "All rights reserved, David Servin",
    feedLinks: {
      rss: baseUrl + '/feed.xml',
      json: baseUrl + '/feed.json',
      atom: baseUrl + '/feed.atom',
    },
    author: {
      name: "David Servin",
      email: 'contact@davidservn.com',
      link: 'https://www.davidservn.com/',
    },
  });

  content.forEach((post) => {
    const url = `${baseUrl}${post._path}`;
    feed.addItem({
      title: post.title ?? '',
      id: url,
      link: url,
      description: post.description,
      date: new Date(post.createdAt),
      image: baseUrl + "/images/blog/meta" + post._path + ".png",
      author: [{
        name: "David Servin",
        email: 'contact@davidservn.com',
        link: 'https://www.davidservn.com/',
      }],
    })
  });

  return feed;
}
