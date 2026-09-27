import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL
  ?? (productionDomain ? `https://${productionDomain}` : "http://localhost:4321");

export default defineConfig({
  site,
  output: "static",
  integrations: [sitemap()],
  image: {
    responsiveStyles: true,
    layout: "constrained"
  }
});
