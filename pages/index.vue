<template>
  <div>
    <p>
      RSS Feed (
      <a target="_blank" href="/feed.xml">XML</a>
      /
      <a target="_blank" href="/feed.json">JSON</a>
      )
    </p>
    <div id="blog-list">
      <div v-for="post in posts" :key="post.slug">
        <article>
          <h1>
            <a :href="'/' + post.slug">
              {{ post.title }}
            </a>
          </h1>
          <p>{{ post.summary }}</p>
        </article>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content()
      .only(['slug', 'title', 'summary']) // Only fetch the fields that we require to improve performance.
      .sortBy('createdAt', 'desc')
      .sortBy('title')
      .fetch()

    return {
      posts
    }
  }
}
</script>
