# Retirement Roadmap Experts

A polished, responsive marketing and education website for Retirement Roadmap Experts. The site helps executives and families explore retirement-income planning, read educational articles, complete a risk questionnaire, watch the YouTube/podcast channel, and schedule a consultation.

## What’s included

- Conversion-focused homepage with interactive planning content
- Dedicated scheduling page connected to Google Calendar
- Search-friendly blog library with nine individual articles
- Responsive desktop, tablet, and mobile layouts
- Structured data, social-sharing metadata, semantic headings, and descriptive image text
- Production `robots.txt`, `sitemap.xml`, absolute canonical URLs, and index-friendly metadata
- Cloudflare R2-hosted video with muted inline autoplay support
- Links to the Risk Analysis Questionnaire and YouTube/podcast channel
- Reusable blog generator for consistent future updates

## Project structure

```text
Meridian/
├── index.html                  # Main website
├── schedule.html               # Consultation scheduling page
├── blogs.html                  # Blog library
├── robots.txt                  # Search crawler rules and sitemap location
├── sitemap.xml                 # Production URL index for search engines
├── CNAME                       # GitHub Pages custom domain
├── blog/                       # Generated individual blog pages
├── assets/
│   ├── css/
│   │   └── blog.css            # Shared blog and article styling
│   └── images/
│       ├── founder.png         # Founder portrait
│       └── blog/               # Blog feature images
└── scripts/
    └── build-blogs.mjs         # Blog-page generator
```

The website is static: no framework, package installation, database, or server-side runtime is required in production.

## Preview locally

Opening the HTML files directly works for basic review. A local web server gives more accurate browser behavior:

```bash
python3 -m http.server 5500
```

Then visit:

- Homepage: `http://127.0.0.1:5500/index.html`
- Blogs: `http://127.0.0.1:5500/blogs.html`
- Scheduling: `http://127.0.0.1:5500/schedule.html`

## Working with blogs

Blog content and the shared page template live in:

```text
scripts/build-blogs.mjs
```

After changing an article, navigation item, shared link, or article template, regenerate the blog library and individual pages:

```bash
node scripts/build-blogs.mjs
```

This command rewrites:

- `blogs.html`
- Every HTML file inside `blog/`

Do not make long-term article edits only in the generated HTML pages; the next generator run would overwrite them. Update `build-blogs.mjs`, then rebuild.

### Adding a blog post

1. Add the feature image to `assets/images/blog/`.
2. Add a new post object to the `posts` array in `scripts/build-blogs.mjs`.
3. Include a unique slug, title, category, image filename, image description, search description, and article body.
4. Run `node scripts/build-blogs.mjs`.
5. Open the library and article at desktop and mobile widths before publishing.

## External services

| Purpose | Destination |
|---|---|
| Schedule a consultation | [Google Calendar appointment page](https://calendar.app.google/jZEN3K4vCPijKqAdA) |
| Risk Analysis Questionnaire | [The Financial HQ](https://thefinancialhq.com/comra-RRE) |
| YouTube and podcast | [Retirement Roadmap Experts](https://www.youtube.com/@RetirementRoadmapExperts) |
| Homepage video | Cloudflare R2 public asset referenced in `index.html` |
| Retirement book | Local `book.pdf` download gated by the homepage name/email form; FormSubmit notifies `rboeck@retirementroadmapexperts.com` |
| Retirement book cover | `assets/images/from-accumulation-to-income-cover.jpg` |

External links open in a new tab where appropriate and use `rel="noopener"`.

## Video behavior

The homepage video is served from Cloudflare R2 rather than stored in this repository. It uses `autoplay`, `muted`, and `playsinline`, which is the most reliable configuration for automatic playback across modern browsers, including iPhone Safari.

Browsers can still suppress autoplay in Low Power Mode, Data Saver modes, or under user-specific media settings. The visible video control remains the fallback.

## SEO checklist

Before deploying:

- Confirm every page has a unique title and meta description.
- Confirm canonical URLs use `https://retirementroadmapexperts.com`.
- Keep `sitemap.xml` updated whenever pages are added, removed, or renamed.
- Keep `robots.txt` pointing to `https://retirementroadmapexperts.com/sitemap.xml`.
- Use absolute production URLs for canonical, Open Graph, Twitter, and structured-data image metadata.
- Keep one descriptive `<h1>` per page.
- Compress new images and preserve meaningful `alt` text.
- Rebuild blogs after changing shared article metadata.
- Review financial figures, tax rules, and Social Security references for freshness before publishing.
- Submit `https://retirementroadmapexperts.com/sitemap.xml` in Google Search Console after deployment.

## Deployment

The project can be hosted on any static host, including GitHub Pages, Cloudflare Pages, Netlify, Vercel, Amazon S3, or a conventional web server.

Deploy the repository contents as-is, preserving the folder structure. No build command is needed unless blog source content changed immediately before deployment; in that case, run:

```bash
node scripts/build-blogs.mjs
```

The publishing directory is the project root.

## Quick quality check

Before each release:

1. Test `index.html`, `blogs.html`, one individual article, and `schedule.html`.
2. Check desktop and mobile navigation.
3. Confirm images and the R2 video load successfully.
4. Test the schedule, risk-analysis, YouTube, and book download form.
5. Confirm the mobile video panel does not open automatically.
6. Check the browser console for broken resources or JavaScript errors.
7. Verify generated blog links after running the blog generator.

## Brand notes

- Primary visual direction: deep navy, warm gold, soft ivory, and restrained emerald accents
- Display typeface: Cormorant Garamond
- Interface typeface: DM Sans
- Voice: clear, calm, precise, and educational
- Primary audience: executives and families approaching or entering retirement

## Maintenance

Keep source images in `assets/images/`, shared styles in `assets/css/`, content pages at the project root or in `blog/`, and development utilities in `scripts/`. Avoid committing temporary exports, document renders, browser screenshots, or large video files.

---

© 2026 Retirement Roadmap Experts. All rights reserved.
