<template>
  <div class="journal">
    <div class="container journal-container">
      <div class="journal-header">
        <h1 v-html="post.title" class="journal-title" />
        <div class="journal-meta">
          <div class="journal-author">
            <span class="label">Author</span>
            <span class="author-name">{{ post.author || "NWA" }}</span>
          </div>
          <div class="journal-date">
            <span class="label">Date</span>
            <div>{{ formatDate(post.date) }}</div>
          </div>
          <div class="journal-time" v-if="post.timeToRead">
            <span class="label">Time</span>
            <span>{{ post.timeToRead }} min read</span>
          </div>
        </div>
      </div>

      <article class="journal-content">
        <ContentRenderer :value="post" />
      </article>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(`journal-${route.params.slug}`, () =>
  queryContent("journal", route.params.slug).findOne()
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
  });
}

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Set page title
useHead({
  title: post.value.title,
});
</script>

<style scoped>
.journal {
  padding: 2rem 0;
}

.journal-container {
  max-width: 720px;
}

.journal-header {
  margin-bottom: 3rem;
}

.journal-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  line-height: 1.1;
}

.journal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.journal-meta > div {
  display: flex;
  flex-direction: column;
}

.journal-meta .label {
  font-size: 0.8rem;
  color: var(--color-contrast-1);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.author-name {
  font-weight: 600;
}

.journal-content {
  line-height: 1.7;
}

.journal-content :deep(h2) {
  margin: 2rem 0 1rem 0;
  font-size: 1.5rem;
}

.journal-content :deep(h3) {
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1.25rem;
}

.journal-content :deep(p) {
  margin: 1rem 0;
}

.journal-content :deep(pre) {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow-x: auto;
}

.journal-content :deep(code) {
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas,
    "Courier New", monospace;
}
</style>
