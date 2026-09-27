# That's Sew Donna

A statically generated sewing portfolio and journal. The public site is built
with [Astro](https://astro.build), content and images live in this repository,
and [Pages CMS](https://pagescms.org) provides the browser-based editor.

There is no application server or database. Saving content through Pages CMS
commits files to GitHub; Vercel sees the commit and publishes a new static build.

## Local development

Requirements:

- Node.js 22 (see `.nvmrc`)
- npm

```bash
npm install
npm run dev
```

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local site, including draft content |
| `npm run check` | Validate Astro, TypeScript, and content schemas |
| `npm run build` | Validate and create the production site in `dist/` |
| `npm run preview` | Preview the production build locally |

Set `SITE_URL` to the production origin when building locally if canonical URLs
need to match the deployed site:

```bash
SITE_URL=https://example.com npm run build
```

## Content

Content is organized into:

- `src/content/projects/` — individual sewing projects
- `src/content/journal/` — journal entries
- `src/content/pages/about.md` — the About page
- `src/data/site.json` — site name, introduction, email, and social links
- `src/assets/images/` — author-uploaded images

Projects and journal posts use Markdown with structured frontmatter. The schema
in `src/content.config.ts` validates every field during the build. Draft entries
are visible locally but excluded from production pages, detail routes, and RSS.

The included `sample-project.md` and `sample-post.md` are clearly marked drafts.
They demonstrate every major field and can be deleted after the first real
content is created.

### Image guidance

For good visual quality without making Git history unnecessarily large:

- Prefer JPEG, WebP, or AVIF photographs.
- Resize photos to about 2400 pixels on the longest edge before uploading.
- Aim for less than 2 MB per image.
- Use short descriptive filenames such as `linen-apron-front.webp`.
- Describe the visible content of every image in its photo-description field.

Images imported from `src/assets/images/` are processed by Astro during the
static build. Original files remain in GitHub, so they are portable to another
host or CMS later.

## Editing with Pages CMS

The editor is configured by `.pages.yml`.

Initial owner setup:

1. Sign in at [app.pagescms.org](https://app.pagescms.org) with the GitHub
   account that owns or can edit this repository.
2. Authorize the repository and select its production branch.
3. Confirm that **Sewing projects**, **Journal**, **About page**, and
   **Site settings** appear in the sidebar.
4. Give Donna repository access appropriate for editing through Pages CMS.

Routine publishing:

1. Open Pages CMS and choose **Sewing projects** or **Journal**.
2. Create an entry and complete the labeled fields.
3. Upload the cover photo and add a useful photo description.
4. Leave **Keep as draft** enabled while writing.
5. Preview locally or in a Vercel preview deployment when needed.
6. Turn off **Keep as draft** and save to publish.
7. Wait for the Vercel deployment attached to the resulting GitHub commit.

Pages CMS is only the editing layer. If it is replaced later, no content
migration is required: the Markdown, JSON, and images are already in GitHub.
CloudCannon is a reasonable paid alternative if a richer editorial workflow is
eventually needed.

## Deploying to Vercel

1. Import this GitHub repository into Vercel.
2. Vercel should detect Astro automatically.
3. Use `npm run build` as the build command and `dist` as the output directory
   if manual values are requested.
4. Vercel supplies the production domain automatically. If the custom domain
   should be used for canonical URLs before it becomes the project’s primary
   domain, set `SITE_URL` to that HTTPS origin without a trailing slash.
5. Deploy, then make the selected production branch match the branch used by
   Pages CMS.

Every push gets a Vercel preview deployment; pushes to the production branch
update the public site. No Vercel functions, storage, or database are required.

## Domain and recovery

Connect a custom domain from the Vercel project’s **Domains** settings, then set
`SITE_URL` to that same origin. DNS remains with the chosen domain registrar.

To recover or move the site, clone the repository, install Node 22, run
`npm install && npm run build`, and deploy the generated `dist/` directory to
any static host. The Git history contains the content and original images.
