<template>
  <div>
    <div id="blog">
      <article>
        <h1>
          {{ post.title }}
        </h1>
        <nuxt-content :document="post" />
      </article>
    </div>
    <p>
      Follow me on <a target="_blank" href="https://twitter.com/DavidServn">Twitter</a> to be notified about new posts or through RSS ( <a target="_blank" href="/feed.xml">XML</a> / <a target="_blank" href="/feed.json">JSON</a> ).
    </p>
    <li>
      <a href="/"><span>More posts</span></a>
    </li>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    const [post] = await $content()
      .where({ slug: params.pathMatch })
      .fetch()

    if (!post) {
      return error({ statusCode: 404, message: 'Post not found' })
    }

    return {
      post
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: this.post.title },
        {
          hid: 'og:image:alt',
          name: 'og:image:alt',
          content: this.post.title,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.post.summary,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.summary,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.BASE_URL + this.post.slug,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'article',
        },
        {
          hid: 'article:published_time',
          name: 'article:published_time',
          content: this.post.createdAt,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content:
            process.env.BASE_URL +
            'images/blog/meta/' +
            this.post.slug +
            '.png',
        },
        {
          hid: 'og:image:width',
          name: 'og:image:width',
          content: '1350',
        },
        {
          hid: 'og:image:height',
          name: 'og:image:height',
          content: '900',
        },
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.BASE_URL + this.post.slug,
        },
      ],
    }
  },
}
</script>
