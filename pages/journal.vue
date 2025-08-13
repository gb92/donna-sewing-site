<template>
  <div class="container">
    <div class="journal-hero">
      <h1 class="journal-header">a wise person once said...</h1>
    </div>
  </div>

  <NuxtLink
    :to="`/journal/${post._path?.split('/').pop()}`"
    v-for="post in posts"
    :key="post._id"
    class="journal-post"
  >
    <div class="container journal">
      <h2 class="journal-title">{{ post.title }}</h2>
      <p class="journal-excerpt">{{ post.description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
const { data: posts } = await useAsyncData("journal", () =>
  queryContent("journal").sort({ date: -1 }).find()
);
</script>

<style scoped>
.container.journal {
  max-width: 720px;
}

.journal-hero {
  padding: 3rem 0;
}

.journal-header {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0;
}

.journal-post {
  display: block;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--color-base-1);
  padding: 2rem 0;
}

.journal-post:hover {
  background: var(--color-base-1);
}

.journal-title {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.journal-excerpt {
  margin: 0;
  color: var(--color-contrast-1);
}
</style>
