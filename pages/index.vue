<template>
  <div class="container">
    <Hero />
    <ProjectsGrid :projects="projects" />
  </div>
  <LatestJournals :journals="journals" />
</template>

<script setup>
// Query content using Nuxt Content
const { data: projects } = await useAsyncData("projects", () =>
  queryContent("projects").sort({ date: -1 }).find()
);

const { data: journals } = await useAsyncData("journals", () =>
  queryContent("journal").limit(4).sort({ date: -1 }).find()
);
</script>
