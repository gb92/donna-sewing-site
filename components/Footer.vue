<template>
  <footer class="footer">
    <div class="container">
      <span v-html="settings.footer" />
    </div>
  </footer>
</template>

<script setup>
import themeData from "~/data/theme.json";
const settings = themeData;
</script>

<style scoped>
.footer {
  font-size: 0.8rem;
  padding: 6rem 0;
}
</style>
