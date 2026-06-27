# SEO Measurement Notes

This site should stay quiet and direct: clearer identity, cleaner evidence, no ranking promises.

## Search Properties

- Prefer a Google Search Console domain property verified through DNS.
- Import the verified Google property into Bing Webmaster Tools when possible.
- Add a separate Bing verification file only if import is not available.
- Do not add repository verification-token placeholders without the real token.

## Sitemap

- Submit `https://mertercan.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Keep sitemap `lastmod` values tied to project `updatedAt`, not deploy time.

## Baseline

Capture a 28-day baseline before deployment if data exists. If the property is new, start after the first Search Console data appears.

Track these queries by query and page where possible:

- `mert ercan`
- `mertcreates`
- `mertcreates github`
- `mertercan`
- `mertercan.com`
- `mert ercan frontend developer`
- `Steam Library Manager`
- `eslint-plugin-next-pages-router`
- `BugJar`

Use 28 days as the first health check and 90 days for a more meaningful trend. Site-wide average position is not enough on its own; branded impressions, correct canonical URLs, and project-query visibility matter more.
