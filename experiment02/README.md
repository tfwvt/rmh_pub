# experiment02

A redesigned website for Robert M. Herzog (novelist, screenwriter, essayist and filmmaker). It brings together the current site at [thezog.com](https://thezog.com), his [Substack](https://robertherzog.substack.com/) and [Medium](https://robertmherzog.medium.com/) articles, and his social profiles.

It's a static site with no build step: open `index.html`, or serve the folder with GitHub Pages.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page structure: header, hero, film feature, screen & stage, books, writing, about, follow/contact |
| `content.js` | **All the content.** Every film, script, book, article, review and social link lives here |
| `app.js` | Turns `content.js` into the page. It also handles the writing filters, search and "Show more" |
| `styles.css` | Design tokens (colours, fonts, spacing) at the top, then styles for each section. Light and dark mode are included |
| `assets/img/` | Images, resized and converted to WebP |

## Adding new work

Edit `content.js` only. Copy an existing entry in the right list, change it, and save:

- **New essay, op-ed, story or poem:** add it to `writing`. Set `kind` to `essay`, `oped`, `fiction` or `poetry`, and the date as `YYYY-MM-DD`. Add one entry to `links` for each place it's published (Substack, Medium, etc.). Pieces are sorted newest first automatically. The three newest dated pieces also appear under "Latest" at the top of the page.
- **New film or script:** add it to `screen`.
- **New book:** add it to `books`.
- **A different featured film:** replace `featuredFilm`.
- **New social profile:** add it to `social`. Icons exist for substack, medium, instagram, tiktok, amazon, linktree and email.

Put any new images in `assets/img/`. Images are optional; cards without one get a typographic layout.

## Sources

The content was gathered on 2026-10-26 from thezog.com (all 41 pages), the Substack archive, the Medium RSS feed, Linktree and Instagram.
