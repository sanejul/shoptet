# Shoptet cache-bust versions (`?v=`)

Live HTML links custom CSS/JS with long cache. After Julie uploads a file, she bumps `?v=` in the shop HTML head and reports the new number here (or we update this file when she reports).

**Agents never upload via admin.** Julie owns File Manager + version bumps.

| File | Live path | Current `v=` | Notes |
|------|-----------|--------------|--------|
| `styles/fonts.css` | `/user/documents/upload/styles/fonts.css` | `3` | |
| `styles/base.css` | `/user/documents/upload/styles/base.css` | `3` | |
| `styles/home.css` | `/user/documents/upload/styles/home.css` | `4` | Pending upload from PR #4 |
| `styles/navigation.css` | `/user/documents/upload/styles/navigation.css` | `11` | Pending upload from PR #4 |
| `styles/style.css` | `/user/documents/upload/styles/style.css` | `50` | |
| `scripts/nav.js` | `/user/documents/upload/scripts/nav.js` | _(no `?v=` on live)_ | |

`banner.html` is not a File Manager asset — paste into homepage **textový banner** when content changes.

## History

| Date | Change |
|------|--------|
| 2026-10-28 | Seeded from live homepage `<link>` tags. |
