# experiment04

This started as a copy of experiment03.

The website for Robert M. Herzog (novelist, screenwriter, essayist and filmmaker), built to replace [thezog.com](https://thezog.com).

Every essay, story, poem, novel excerpt and blog post that lived on thezog.com is now hosted here, each on its own reading page. Pieces that are also on Substack or Medium link to those copies, and work published only elsewhere (for example in *Persuasion*) links out.

## Files

| Path | What it is |
| --- | --- |
| `index.html`, `app.js`, `styles.css` | The home page |
| `content.js` | Films, books, reviews, social links and the About text |
| `content/writing/*.md` | **Every piece of writing**, one Markdown file each |
| `build.js` | Turns the Markdown files into reading pages |
| `templates/` | The reading-page layout (`article.html`) and the not-found page (`404.html`) |
| `read/<slug>/` | Generated reading pages. Don't edit; run the build |
| `writing.js` | Generated list for the home page's Writing section. Don't edit |
| `404.html` | Generated. Sends old thezog.com addresses to their new pages |
| `assets/img/`, `assets/files/` | Images and downloads (including the *No Kidding Around* pitch deck) |

## Adding a new piece of writing

1. Create `content/writing/your-piece-name.md`. The file name becomes the web address: `read/your-piece-name/`.
2. Start it with a header, then write the piece in Markdown below it:

   ```markdown
   ---
   title: The Title
   kind: essay
   date: 2026-11-01
   dek: One-line summary shown under the title.
   image: assets/img/writing/your-piece-name.webp
   links:
     - Substack: https://robertherzog.substack.com/p/...
     - Medium: https://robertmherzog.medium.com/...
   ---

   First paragraph.

   ## A subheading

   More text, with *italics*, **bold** and [links](https://example.com).
   ```

   - `kind` is one of `essay`, `oped`, `fiction`, `poetry` or `notes`.
   - `date` is optional; undated pieces are listed after dated ones.
   - `image` and `links` are optional.
   - Leave the body empty to list a piece that's published only elsewhere. It then links to the first entry under `links`.
   - Other optional fields: `venue` (where it was published), `dateLabel` (shown instead of the date, e.g. `Fall 2010`), `imagePosition` (which part of the image stays in frame on the home page cards, e.g. `50% 20%`), and `listed: false` (hide the piece from the Writing list).
3. Run `node build.js` (Node 18 or newer, no install needed) and commit the results.

The build prints a warning if any Markdown didn't convert cleanly or a page still links to an old thezog.com address.

**Markdown basics:**
- A blank line starts a new paragraph.
- End a line with `\` for a line break inside a paragraph (used for poems).
- `---` on its own line becomes a section break (⁂).
- `> ` at the start of a line makes a quotation.
- `![caption](assets/img/…)` on its own line adds an image.
- Links to other pages on this site are written from the site root, e.g. `read/totem/` or `index.html#books`.

## Moving thezog.com to this site

When the thezog.com domain points at this site, serve the contents of this folder from the domain root. At the root, `404.html` sends visitors from old addresses (`/totem`, `/new-page-30`, `/blog/2021/…`) to the matching new pages. The list of old addresses is kept in each piece's `legacy:` field.

## Sources

The content was imported on 2026-10-26 from thezog.com (all pages and blog posts, via Squarespace's JSON export), Substack, the Medium RSS feed, Linktree and Instagram. Images and downloads were copied into `assets/` so nothing depends on the old site.
