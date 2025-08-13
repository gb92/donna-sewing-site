<template>
  <div class="project">
    <div class="container">
      <div class="project-header">
        <h1 class="project-title" v-html="post.title" />
        <div class="project-info">
          <div class="categories-container" v-if="post.categories">
            <div class="categories">
              <span class="label">Categories</span>
              <span
                class="category"
                v-for="(category, index) in post.categories"
                :key="index"
                v-text="category"
              />
            </div>
          </div>

          <div class="year-container" v-if="post.date">
            <span class="label">Year</span>
            <div>{{ formatYear(post.date) }}</div>
          </div>
        </div>
      </div>

      <article class="content">
        <ContentRenderer :value="post" />
      </article>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(`project-${route.params.slug}`, () =>
  queryContent("projects", route.params.slug).findOne()
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
  });
}

const formatYear = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.getFullYear();
};

// Set page title
useHead({
  title: post.value.title,
});
</script>

<style scoped>
.project {
  padding: 2rem 0;
}

.project-header {
  margin-bottom: 3rem;
}

.project-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  line-height: 1.1;
}

.project-info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.categories-container,
.year-container {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.8rem;
  color: var(--color-contrast-1);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.categories {
  display: flex;
  flex-direction: column;
}

.category {
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.content {
  line-height: 1.7;
}

.content :deep(h2) {
  margin: 2rem 0 1rem 0;
  font-size: 1.5rem;
}

.content :deep(h3) {
  margin: 1.5rem 0 0.5rem 0;
  font-size: 1.25rem;
}

.content :deep(p) {
  margin: 1rem 0;
}

.content :deep(img) {
  width: 100%;
  height: auto;
  margin: 2rem 0;
  border-radius: 0.5rem;
}

.content :deep(pre) {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow-x: auto;
}

.content :deep(code) {
  font-family: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas,
    "Courier New", monospace;
}
</style>
