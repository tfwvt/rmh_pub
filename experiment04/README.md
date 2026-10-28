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
| `build.js` | Builds the finished site into `dist/` |
| `templates/` | The reading-page layout (`article.html`) and the not-found page (`404.html`) |
| `assets/img/`, `assets/files/` | Images and downloads (including the *No Kidding Around* pitch deck) |
| `package.json` | Tells DigitalOcean (and `npm`) how to build the site |
| `dist/` | The built site: the files above plus the reading pages (`read/<slug>/`), the Writing list (`writing.js`) and `404.html`. Generated; not in git |
| `../.pages.yml` | Settings for the Pages CMS editor, at the repository root |

## Adding or editing writing with Pages CMS

[Pages CMS](https://pagescms.org) is a web editor for the Markdown files in `content/writing/`. Saving in it commits the change to GitHub, and DigitalOcean then rebuilds and publishes the site within a few minutes.

**First time:**

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
2. Install the Pages CMS GitHub app on the account that owns this repository (`tfwvt`), and give it access to `rmh_pub`.
3. Open `rmh_pub`. The editor reads its settings from `.pages.yml` at the repository root, and shows a **Writing** collection.

To let someone else edit (for example Robert), add them as a collaborator in Pages CMS or on the GitHub repository.

**A new piece:** open Writing, add a new entry, and fill in the form:

- **Title** and **Kind** are required. The file name, and so the web address (`read/the-title/`), comes from the title when the piece is created. Changing the title later doesn't change the address.
- **Date** is optional. Pieces are listed newest first; undated ones come after the dated ones.
- **Image:** upload or pick one. Uploads go to `assets/img/writing/`. Large photos are published as they are, so resize them to about 1600 pixels wide first.
- **Also published on:** add Substack, Medium or other copies. With no text, the piece links to the first one instead of having its own page.
- **Text:** the piece itself, in Markdown (see the basics below). The newest three dated pieces also appear under "Latest" at the top of the home page.

**Why the text is plain Markdown, not a formatting toolbar:** Pages CMS's rich-text editor rewrites the Markdown every time it saves. Tested on this site's writing, it turned paragraphs that start with "Mr.", "Dr." or "Ms." into numbered lists, turned the dialogue dashes in *Bayou's Edge* into bullet lists, and deleted the video on the *Flights* page. The plain text editor saves exactly what's typed.

Films, books, reviews and the About text live in `content.js`, which the editor doesn't cover. Edit that file on GitHub; the site rebuilds the same way.

## Adding a piece by hand

1. Create `content/writing/your-piece-name.md`. The file name becomes the web address: `read/your-piece-name/`.
2. Start it with a header in YAML, then write the piece in Markdown below it:

   ```markdown
   ---
   title: "The Title: With a Colon"
   kind: essay
   date: 2026-11-01
   dek: One-line summary shown under the title.
   image: assets/img/writing/your-piece-name.webp
   links:
     - label: Substack
       url: https://robertherzog.substack.com/p/...
     - label: Medium
       url: https://robertmherzog.medium.com/...
   ---

   First paragraph.

   ## A subheading

   More text, with *italics*, **bold** and [links](https://example.com).
   ```

   - Put a value in double quotes if it contains `: ` or starts with `*`, `"`, `[` or `>`.
   - `kind` is one of `essay`, `oped`, `fiction`, `poetry`, `notes` or `film`.
   - `date` is optional; undated pieces are listed after dated ones.
   - `image` and `links` are optional.
   - Leave the body empty to list a piece that's published only elsewhere. It then links to the first entry under `links`.
   - Other optional fields: `venue` (where it was published), `dateLabel` (shown instead of the date, e.g. `Fall 2010`), `label` (shown instead of the kind, e.g. `Short film`), `imagePosition` (which part of the image stays in frame on the home page cards, e.g. `50% 20%`), `unlisted: true` (hide the piece from the Writing list) and `legacy` (old thezog.com addresses, see below).
3. Commit and push. DigitalOcean builds and publishes the site.

To preview locally: run `npm install` once, then `npm run build` (Node 18 or newer), and open `dist/index.html`. The build prints a warning if any Markdown didn't convert cleanly or a page still links to an old thezog.com address. If a header can't be read, the build stops and names the file.

**Markdown basics:**
- A blank line starts a new paragraph.
- End a line with `\` (or two spaces) for a line break inside a paragraph (used for poems).
- `---` on its own line becomes a section break (⁂).
- `> ` at the start of a line makes a quotation.
- `## ` at the start of a line makes a subheading.
- `+ ` or `1. ` at the start of each line makes a list. (`- ` doesn't: it's kept as a dialogue dash.)
- `![caption](assets/img/…)` on its own line adds an image.
- Links to other pages on this site are written from the site root, e.g. `read/totem/` or `index.html#books`.

## Hosting on DigitalOcean

The site is a DigitalOcean App Platform static site that deploys automatically when `main` changes on GitHub. DigitalOcean runs the build, so nothing generated is committed. The app's static site component needs these settings:

| Setting | Value |
| --- | --- |
| Source directory | `experiment04` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Error document | `404.html` |

If a deploy fails, the build log in DigitalOcean shows the error. A header that isn't valid YAML stops the build and names the file, and the live site stays as it was.

## Moving thezog.com to this site

Point the thezog.com domain at the DigitalOcean app. The site is served from the domain root, where `404.html` sends visitors from old addresses (`/totem`, `/new-page-30`, `/blog/2021/…`) to the matching new pages. The list of old addresses is kept in each piece's `legacy` field.

## Sources

The content was imported on 2026-10-26 from thezog.com (all pages and blog posts, via Squarespace's JSON export), Substack, the Medium RSS feed, Linktree and Instagram. Images and downloads were copied into `assets/` so nothing depends on the old site.
