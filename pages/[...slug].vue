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
    <div id="blog">
      <p class="back">
        <a href="/"><span>Back</span></a>
      </p>
      <article>
        <h1>
          {{ post.title }}
        </h1>
        <ContentRenderer :value="post" />
      </article>
      <br />
      <p class="footer">
        Follow me on <a target="_blank" href="https://twitter.com/DavidServn">Twitter</a> to be notified about new posts.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  let path = useRoute().fullPath;
  if (path[path.length - 1] == '/') {
    path = path.slice(0, -1);
  }

  const { data: content } = await useAsyncData('post', () => queryContent()
    .where({ _path: path })
    .findOne());

  const post = content.value;
  if (!post) {
    throw createError({ status: 404, statusText: "Post not found" });
  }

  const config = useRuntimeConfig()

  useHead({
    title: post.title,
    meta: [
      {
        hid: "og:title",
        name: "og:title",
        content: post.title
      },
      {
        hid: "og:image:alt",
        name: "og:image:alt",
        content: post.title,
      },
      {
        hid: "description",
        name: "description",
        content: post.summary,
      },
      {
        hid: "og:description",
        name: "og:description",
        content: post.summary,
      },
      {
        hid: "og:url",
        name: "og:url",
        content: config.public.BASE_URL + post._path,
      },
      {
        hid: "og:type",
        name: "og:type",
        content: "article",
      },
      {
        hid: "article:published_time",
        name: "article:published_time",
        content: post.createdAt,
      },
      {
        hid: "og:image",
        name: "og:image",
        content: config.public.BASE_URL + "/images/blog/meta/" + post.slug + ".png",
      },
      {
        hid: "og:image:width",
        name: "og:image:width",
        content: "1350",
      },
      {
        hid: "og:image:height",
        name: "og:image:height",
        content: "900",
      },
    ],
    link: [
      {
        hid: "canonical",
        rel: "canonical",
        href: config.public.BASE_URL + post._path,
      },
    ],
  });
</script>
