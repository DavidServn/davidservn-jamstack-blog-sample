<template>
  <div>
    <div class="header">
      <p class="blog-title">DavidServn's Blog</p>
      <p class="rss-p">
        RSS Feed (
        <a target="_blank" href="/feed.xml">XML</a>
        /
        <a target="_blank" href="/feed.json">JSON</a>
        /
        <a target="_blank" href="/feed.atom">ATOM</a>
        )
      </p>
    </div>
    <div id="blog-list">
      <div v-for="post in posts" :key="post._path">
        <article>
          <h1>
            <a class="title" :href="post._path">
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

<script setup lang="ts">
  const { data: content } = await useAsyncData('index', () => queryContent()
    .only(["_path", "title", "summary"]) // Only fetch the fields that we require to improve performance.
    .sort({ title: 1, createdAt: -1 })
    .find());
  const posts = content.value ?? [];
</script>
