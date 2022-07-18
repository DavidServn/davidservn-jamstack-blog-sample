<template>
  <div>
    <div class="header">
      <p class="blog-title">DavidServn's Blog</p>
      <p class="rss-p">
        RSS Feed (
        <a target="_blank" href="/feed.xml">XML</a>
        /
        <a target="_blank" href="/feed.json">JSON</a>
        )
      </p>
    </div>
    <div id="blog-list">
      <div v-for="post in posts" :key="post.slug">
        <article>
          <h1>
            <a class="title" :href="'/' + post.slug">
              {{ post.title }}
            </a>
          </h1>
          <p class="desc">{{ post.summary }}</p>
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
      .only(["slug", "title", "summary"]) // Only fetch the fields that we require to improve performance.
      .sortBy("createdAt", "desc")
      .sortBy("title")
      .fetch();

    return {
      posts,
    };
  },
};
</script>
