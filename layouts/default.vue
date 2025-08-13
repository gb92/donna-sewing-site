<template>
  <div class="layout" :class="{ 'sticky-header': $route.path === '/' }">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
// Components are auto-imported in Nuxt 3
</script>
