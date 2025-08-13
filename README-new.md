# Donna Sewing Site - Portfolio & Blog

A modern portfolio and blog site built with Nuxt 3, migrated from Gridsome for Node.js 22 compatibility.

## 🚀 Migration to Nuxt 3

This site has been successfully migrated from Gridsome to Nuxt 3 to support Node.js 22 and modern web development practices.

### What Changed

- **Framework**: Migrated from Gridsome to Nuxt 3
- **Content**: Now uses `@nuxt/content` for markdown processing
- **Styling**: Maintained existing CSS with improvements
- **Components**: Converted to Composition API with `<script setup>`
- **Routing**: Now uses Nuxt's file-based routing
- **Node.js**: Full compatibility with Node.js 22+

### Features

- ✅ Portfolio project showcase
- ✅ Blog/journal with markdown content
- ✅ Contact page
- ✅ Dark/light mode toggle
- ✅ Responsive design
- ✅ Static site generation
- ✅ Modern Vue 3 Composition API

## 🛠 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── assets/          # CSS and other assets
├── components/      # Vue components
├── content/         # Markdown content
│   ├── journal/     # Blog posts
│   └── projects/    # Portfolio projects
├── layouts/         # Page layouts
├── pages/           # Page components and routing
├── public/          # Static assets
├── data/            # JSON configuration
└── nuxt.config.ts   # Nuxt configuration
```

## 🎨 Content Management

Content is managed through markdown files in the `content/` directory:

- **Projects**: `content/projects/*.md`
- **Journal Posts**: `content/journal/*.md`

Each markdown file includes frontmatter for metadata like title, date, categories, etc.

## 🔧 Configuration

The site configuration can be customized through:

- `nuxt.config.ts` - Nuxt configuration
- `data/theme.json` - Site theme and content settings

## 📝 Adding Content

### New Project

Create a new markdown file in `content/projects/`:

```markdown
---
title: "Project Name"
date: 2025-01-01
categories: ["web", "design"]
thumbnail: "/images/project.jpg"
---

Project description and content here...
```

### New Journal Post

Create a new markdown file in `content/journal/`:

```markdown
---
title: "Post Title"
date: 2025-01-01
author: "Your Name"
excerpt: "Brief description..."
---

Post content here...
```

## 🚀 Deployment

This site can be deployed to any static hosting service:

```bash
# Generate static files
npm run generate

# Upload the .output/public/ directory to your hosting service
```

Compatible with Netlify, Vercel, GitHub Pages, and more.

## 🔄 Migration Notes

If you were previously using Gridsome, here are the key differences:

- Content queries now use `queryContent()` instead of GraphQL
- Components use Vue 3 Composition API with `<script setup>`
- Links use `<NuxtLink>` instead of `<g-link>`
- Images are referenced directly from `/public` instead of using `<g-image>`
- Routing is file-based in the `pages/` directory
