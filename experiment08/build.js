#!/usr/bin/env node
/*
 * Builds the site into dist/ from content/writing/*.md and the static files.
 *
 *   npm install   (once)
 *   npm run build
 *
 * Writes to dist/:
 *   the home page, styles, script and assets. The home page gets its address, search tags and
 *   sections (films, books, the Writing list and so on, from build-home.js) filled in
 *   read/<slug>/index.html   one page per piece that has body text
 *   <old address>/index.html a redirect from each old thezog.com address to its new page
 *   404.html                 the not-found page, which also catches old addresses in odd capitalisation
 *   sitemap.xml, robots.txt  for search engines
 *   assets/share/…           JPEG copies of the reading pages' pictures, for link previews
 *
 * Needs Node 20.11 or newer. (A JavaScript module: package.json says "type": "module".)
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import YAML from "yaml";
import { homeSections, ARROW, bookId, workId } from "./build-home.js";

// The site's public address, with no slash at the end. It goes into the canonical and share
// tags, the structured data and the sitemap. Change it here if the site moves.
const SITE_URL = "https://thezog.com";

const ROOT = import.meta.dirname;
const SRC = path.join(ROOT, "content", "writing");
const DIST = path.join(ROOT, "dist");
const OUT = path.join(DIST, "read");
// The site's icon (the Z) is also copied to the root, where browsers and search engines look for it.
const STATIC = ["index.html", "app.js", "styles.css", "assets", "favicon.ico", "favicon.svg", "apple-touch-icon.png"];

const KIND_LABELS = { essay: "Essay", oped: "Op-Ed", fiction: "Fiction", poetry: "Poetry", notes: "Notes", film: "Film" };

// ---------- Site settings (social links etc.) from content.js ----------
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content.js"), "utf8"), sandbox);
const SITE = sandbox.window.SITE;

// ---------- Front matter ----------
// The header is standard YAML, as written by Pages CMS (see .pages.yml at the repository root).
// Site paths may be written with or without a leading slash: "/assets/…" and "assets/…" are the same.
const sitePath = (u) => String(u).replace(/^\/(?!\/)/, "");

function parseFile(file) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n?---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  let data;
  try {
    data = YAML.parse(m[1]) || {};
  } catch (err) {
    throw new Error(`${file}: can't read the header: ${err.message}`);
  }
  const meta = {};
  // Plain values become strings so a title like 1968 or a date stays text.
  for (const [k, v] of Object.entries(data)) if (v != null && typeof v !== "object") meta[k] = String(v).trim();
  meta.links = (data.links || []).filter((l) => l && l.url).map((l) => ({ label: String(l.label || "Read").trim(), url: sitePath(String(l.url).trim()) }));
  meta.legacy = (data.legacy || []).map((s) => String(s).trim()).filter(Boolean);
  for (const k of ["image"]) if (meta[k]) meta[k] = sitePath(meta[k]);
  for (const k of Object.keys(meta)) if (meta[k] === "") delete meta[k];
  meta.slug = path.basename(file, ".md");
  meta.body = m[2].trim();
  meta.listed = data.unlisted !== true && data.listed !== false;
  return meta;
}

// ---------- Markdown ----------
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const isAbsolute = (u) => /^(https?:|mailto:|tel:|#|\/\/)/i.test(u);
const fixUrl = (u, prefix) => (isAbsolute(u) ? u : prefix + sitePath(u));
// The site's arrows (ARROW comes from build-home.js), pointing right and left.
const BACK_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
const linkTarget = (u) => (/^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : "");

function inline(text, prefix) {
  const keep = [];
  const stash = (html) => `\u0000${keep.push(html) - 1}\u0000`;
  let s = text
    .replace(/\\\n/g, () => stash("<br>"))
    .replace(/ {2,}\n/g, () => stash("<br>"))
    .replace(/\\([\\`*_[\]()#+\-.!>{}])/g, (_, c) => stash(esc(c)));
  s = esc(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_, alt, src) => stash(`<img src="${esc(fixUrl(src, prefix))}" alt="${alt}" loading="lazy">`));
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const url = fixUrl(href.replace(/&amp;/g, "&"), prefix);
    return `<a href="${esc(url)}"${linkTarget(url)}>${label}</a>`;
  });
  s = s.replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*(?=\S)([\s\S]*?\S)\*/g, "<em>$1</em>");
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => keep[i]);
}

function markdown(md, prefix) {
  const blocks = md.split(/\n{2,}/).map((b) => b.replace(/^\n+|\n+$/g, "")).filter(Boolean);
  const html = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    let m;
    if (/^<[a-z]/i.test(b)) html.push(b);
    else if (/^-{3,}$/.test(b)) html.push("<hr>");
    else if ((m = b.match(/^(#{1,4})\s+([\s\S]*)$/))) {
      const level = Math.max(2, m[1].length);
      html.push(`<h${level}>${inline(m[2], prefix)}</h${level}>`);
    } else if ((m = b.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/))) {
      const cap = m[3] ? `<figcaption>${inline(m[3], prefix)}</figcaption>` : "";
      html.push(`<figure><img src="${esc(fixUrl(m[2], prefix))}" alt="${esc(m[1] || m[3] || "")}" loading="lazy">${cap}</figure>`);
    } else if (b.split("\n").every((l) => l.startsWith(">"))) {
      html.push(`<blockquote>${markdown(b.replace(/^> ?/gm, ""), prefix)}</blockquote>`);
    } else if (/^(\+ |\d+\. )/.test(b)) {
      // Consecutive list blocks form one list.
      const ordered = /^\d+\. /.test(b);
      const start = ordered ? parseInt(b, 10) : 1;
      const items = [];
      while (i < blocks.length && (ordered ? /^\d+\. /.test(blocks[i]) : /^\+ /.test(blocks[i]))) {
        for (const part of blocks[i].split(ordered ? /\n(?=\d+\. )/ : /\n(?=\+ )/)) {
          items.push(`<li>${inline(part.replace(ordered ? /^\d+\. / : /^\+ /, ""), prefix)}</li>`);
        }
        i++;
      }
      i--;
      const tag = ordered ? "ol" : "ul";
      html.push(`<${tag}${ordered && start !== 1 ? ` start="${start}"` : ""}>${items.join("")}</${tag}>`);
    } else html.push(`<p>${inline(b, prefix)}</p>`);
  }
  return html.join("\n");
}

// ---------- Helpers ----------
const fmtDate = (p) => {
  if (p.dateLabel) return p.dateLabel;
  if (!p.date) return "";
  return new Date(p.date + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
};
const kindLabel = (p) => p.label || KIND_LABELS[p.kind] || "";
const byDate = (a, b) => {
  if (a.date && b.date) return b.date.localeCompare(a.date);
  if (a.date) return -1;
  if (b.date) return 1;
  return a.title.localeCompare(b.title);
};
const plain = (s) => String(s || "").replace(/[*_\\]/g, "");
// Full address of a site path ("read/totem/", "assets/…"); addresses elsewhere are left as they are.
const absUrl = (u) => (/^https?:/i.test(u) ? u : `${SITE_URL}/${sitePath(u)}`);
// Search-result summary for a piece without a dek: the opening words of its text as plain prose.
function summary(md, max = 155) {
  const text = md
    .replace(/(\\| {2,})\n(?!\n)/g, " / ") // a poem's line breaks, written the usual way for quoted verse
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^(#{1,4}|>|\+|\d+\.)\s+/gm, "")
    .replace(/^-{3,}$/gm, " ")
    .replace(/[*_\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "").replace(/[\s,;:.!?—–\/-]+$/, "") + "…";
}
// A <script type="application/ld+json"> block. "<" is escaped so the JSON can't close the tag.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PORTRAIT_JPG = "assets/img/robert-herzog.jpg"; // the share image when a page has none of its own
// Schema.org types for the reading pages.
const SCHEMA_TYPES = { fiction: "ShortStory", poetry: "CreativeWork" };

// ---------- Load ----------
const pieces = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parseFile(path.join(SRC, f)))
  .sort(byDate);

for (const p of pieces) {
  if (!p.title || !p.kind) throw new Error(`${p.slug}: title and kind are required`);
  p.url = p.body ? `read/${p.slug}/` : null;
  // A piece with neither text nor a link (e.g. a work in progress) is listed as a card only.
  p.href = p.url || p.links[0]?.url || null;
}

// ---------- Article pages ----------
const template = fs.readFileSync(path.join(ROOT, "templates", "article.html"), "utf8");
const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : ""));

const ICON_PATHS = {
  substack: "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z",
  medium: "M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
  external: "M7 5h12v12h-2V8.4L6.7 18.7l-1.4-1.4L15.6 7H7V5Z",
};
const linkIcon = (label) => {
  const l = label.toLowerCase();
  const d = l.includes("substack") ? ICON_PATHS.substack : l.includes("medium") ? ICON_PATHS.medium : ICON_PATHS.external;
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
};

// Pieces listed in content.js's publishedStories link back to the Short Fiction and Poetry
// section from the top of their page; everything else links back to the full Writing list.
const shortFictionSlugs = new Set(
  (SITE.publishedStories || []).map((s) => (String(s.url).match(/read\/([^/]+)/) || [])[1]).filter(Boolean)
);

// Pages linked from a Screen & Stage card (e.g. Flights) or a book card (e.g. a novel's opening
// chapters) link back to that card (ids from workId() and bookId() in build-home.js).
const readSlug = (url) => (String(url).match(/^read\/([^/]+)/) || [])[1];
const screenCards = new Map();
for (const w of SITE.screen || []) {
  for (const l of w.links || []) if (readSlug(l.url)) screenCards.set(readSlug(l.url), workId(w));
}
const bookCards = new Map();
for (const b of SITE.books || []) {
  for (const l of b.buy || []) if (readSlug(l.url)) bookCards.set(readSlug(l.url), bookId(b));
}
// The featured film's own page (featuredFilm.pageLink, e.g. No Kidding Around) links back to its
// Screen & Stage card if one links to it (as above), otherwise to the film band (#film).
const filmPageSlug = readSlug(SITE.featuredFilm?.pageLink?.url || "");

fs.rmSync(DIST, { recursive: true, force: true });
for (const f of STATIC) fs.cpSync(path.join(ROOT, f), path.join(DIST, f), { recursive: true });
const listed = pieces.filter((p) => p.listed);
// The home page's Writing list (and Latest Articles and the Short Fiction cards' dates).
const list = listed.map((p) => {
  const o = { kind: p.kind, title: p.title, dek: p.dek || "", date: p.date || null };
  for (const k of ["dateLabel", "venue", "image", "imagePosition", "url"]) if (p[k]) o[k] = p[k];
  o.links = p.links;
  return o;
});

// ---------- Share images ----------
// LinkedIn and some other sites don't show WebP pictures in link previews, so each picture a page
// shares gets a JPEG copy, at most 1200 pixels wide, under assets/share/ (in the same folders as
// under assets/img/). This needs the sharp package (npm install); without it, or if a picture
// can't be read, the page shares the original picture instead.
const sharp = await import("sharp").then((m) => m.default).catch(() => null);
const shareWarnings = sharp ? [] : ["sharp isn't installed, so pages share their original pictures (LinkedIn doesn't show WebP)"];
async function shareCopy(image) {
  if (!sharp || /^https?:/i.test(image)) return { url: image };
  const out = "assets/share/" + sitePath(image).replace(/^assets\/(img\/)?/, "").replace(/\.[^./]*$/, "") + ".jpg";
  try {
    fs.mkdirSync(path.dirname(path.join(DIST, out)), { recursive: true });
    const info = await sharp(path.join(ROOT, sitePath(image)))
      .resize({ width: 1200, withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(DIST, out));
    return { url: out, width: info.width, height: info.height };
  } catch (err) {
    shareWarnings.push(`${image}: no JPEG copy for link previews (${err.message})`);
    return { url: image };
  }
}
const shareImages = new Set([PORTRAIT_JPG, ...pieces.filter((p) => p.body && p.image).map((p) => p.image)]);
const shared = new Map(await Promise.all([...shareImages].map(async (img) => [img, await shareCopy(img)])));
// og:image:width and og:image:height let Facebook and LinkedIn show the picture the first time a link is shared.
const ogImageSize = (s) =>
  s.width ? `<meta property="og:image:width" content="${s.width}">\n  <meta property="og:image:height" content="${s.height}">` : "";

// ---------- Home page: sections, address, share image and structured data ----------
// The sections are written into the page itself (build-home.js), so search engines and other
// sites see the whole page without running its script. The structured data describes Robert
// as a person (with his profiles elsewhere) and the site itself.
const homePath = path.join(DIST, "index.html");
fs.writeFileSync(
  homePath,
  fill(fs.readFileSync(homePath, "utf8"), {
    ...homeSections(SITE, list),
    siteUrl: SITE_URL,
    ogImage: absUrl(shared.get(PORTRAIT_JPG).url),
    ogImageSize: ogImageSize(shared.get(PORTRAIT_JPG)),
    jsonld: jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE_URL}/`, name: SITE.person.name, publisher: { "@id": PERSON_ID }, inLanguage: "en" },
        {
          "@type": "Person",
          "@id": PERSON_ID,
          name: SITE.person.name,
          url: `${SITE_URL}/`,
          image: absUrl(PORTRAIT_JPG),
          jobTitle: SITE.person.roles.join(", "),
          ...(SITE.about?.lead ? { description: SITE.about.lead } : {}),
          sameAs: SITE.social.map((s) => s.url),
        },
      ],
    }),
  })
);

for (const p of pieces.filter((x) => x.body)) {
  const prefix = "../../";
  const more = listed
    .filter((x) => x.slug !== p.slug && x.kind === p.kind && x.href)
    .slice(0, 3)
    .map((x) => {
      const href = x.url ? prefix + x.url : x.links[0].url;
      return `<li><a href="${esc(href)}"${linkTarget(href)}><span class="more-title">${esc(plain(x.title))}</span><span class="more-meta">${esc(fmtDate(x))}</span></a></li>`;
    })
    .join("");
  const meta = [kindLabel(p), fmtDate(p)].filter(Boolean).map(esc).join(" · ");
  // The back link goes to the piece's card on the home page (ids set in app.js): its Short
  // Fiction and Poetry card if it has one, else its Screen & Stage card or the film band, else
  // its book's card, else its Writing card, else the top of Writing.
  const backSection = shortFictionSlugs.has(p.slug) ? `short-fiction-${p.slug}`
    : screenCards.has(p.slug) ? screenCards.get(p.slug)
    : p.slug === filmPageSlug ? "film"
    : bookCards.has(p.slug) ? bookCards.get(p.slug)
    : p.listed ? `writing-${p.slug}` : "writing";
  const backLabel = shortFictionSlugs.has(p.slug) ? "Short Fiction and Poetry"
    : screenCards.has(p.slug) || p.slug === filmPageSlug ? "Screen &amp; Stage"
    : bookCards.has(p.slug) ? "Books"
    : "All writing";
  const canonical = absUrl(p.url);
  const description = p.dek ? plain(p.dek) : summary(p.body);
  const share = shared.get(p.image || PORTRAIT_JPG);
  const shareImage = absUrl(share.url);
  const vars = {
    prefix,
    title: esc(plain(p.title)),
    description: esc(description),
    canonical: esc(canonical),
    // Wide previews for pieces with their own picture; the portrait fallback is tall, so it gets the small square card.
    twitterCard: p.image ? "summary_large_image" : "summary",
    jsonld: jsonLd({
      "@context": "https://schema.org",
      "@type": SCHEMA_TYPES[p.kind] || "Article",
      headline: plain(p.title).slice(0, 110),
      description,
      url: canonical,
      mainEntityOfPage: canonical,
      image: shareImage,
      ...(p.date ? { datePublished: p.date } : {}),
      ...(SCHEMA_TYPES[p.kind] === "CreativeWork" ? { genre: "Poetry" } : {}),
      author: { "@type": "Person", "@id": PERSON_ID, name: SITE.person.name, url: `${SITE_URL}/` },
      isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE_URL}/` },
      inLanguage: "en",
    }),
    meta,
    backSection,
    backLabel,
    backArrow: BACK_ARROW,
    // backLinkAtEnd: true in a piece's header repeats the back link at the bottom of the page.
    backEnd: p.backLinkAtEnd === "true"
      ? `<a class="back-link back-link-end" href="${prefix}index.html#${backSection}">${BACK_ARROW}${backLabel}</a>` : "",
    dek: p.dek ? `<p class="article-dek">${inline(p.dek, prefix)}</p>` : "",
    venue: p.venue ? `<p class="article-venue">${esc(p.venue)}</p>` : "",
    // No lead image for poems, or when the image already appears in the text.
    hero: p.image && p.kind !== "poetry" && !p.body.includes(p.image)
      ? `<figure class="article-hero"><img src="${esc(fixUrl(p.image, prefix))}" alt=""${p.imagePosition ? ` style="object-position:${esc(p.imagePosition)}"` : ""}></figure>`
      : "",
    ogImage: esc(shareImage),
    ogImageSize: ogImageSize(share),
    body: markdown(p.body, prefix),
    proseClass: p.kind === "poetry" ? "prose prose-poem" : "prose",
    alsoOn: p.links.length
      ? `<div class="also-on"><span>Also published on</span>${p.links
          .map((l) => `<a class="platform" href="${esc(l.url)}"${linkTarget(l.url)}>${linkIcon(l.label)}${esc(l.label)}</a>`)
          .join("")}</div>`
      : "",
    more: more
      ? `<section class="more"><div class="wrap-narrow"><p class="eyebrow">More ${esc(kindLabel(p).toLowerCase())}</p><ul class="more-list">${more}</ul><a class="text-link" href="${prefix}index.html#writing">All writing ${ARROW}</a></div></section>`
      : "",
    social: SITE.social
      .map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a></li>`)
      .join(""),
    year: String(new Date().getFullYear()),
  };
  const dir = path.join(OUT, p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), fill(template, vars));
}

// ---------- 404.html with redirects from the old site ----------
const redirects = {
  "/novel": "index.html#books",
  "/essayingamerica": "index.html#books",
  "/testimonials": "index.html#books",
  "/new-page-2": "index.html#screen",
  "/the-country-annex": "index.html#about",
  "/contact": "index.html#follow",
  "/contact-2": "index.html#follow",
  "/blog": "index.html#writing",
  "/fiction": "index.html#short-fiction",
  "/opedipal-nonfiction": "index.html#writing",
};
for (const p of pieces) for (const old of p.legacy) if (p.href) redirects[old.toLowerCase().replace(/\/+$/, "")] = p.href;
const notFound = fs.readFileSync(path.join(ROOT, "templates", "404.html"), "utf8");
fs.writeFileSync(path.join(DIST, "404.html"), fill(notFound, { redirects: JSON.stringify(redirects, null, 2) }));

// ---------- A redirect page at each old address ----------
// The 404 page's redirect runs in the browser, but search engines see a "not found" there and
// drop the old page from their results. A page at the old address that forwards straight away
// counts as a permanent move, so the old page's place in search results passes to the new one.
let redirectPages = 0;
for (const [old, target] of Object.entries(redirects)) {
  const dir = path.join(DIST, old);
  const file = path.join(dir, "index.html");
  if (!dir.startsWith(DIST + path.sep) || fs.existsSync(file)) continue; // never replace a real page
  // Forward to a path on this site (so it also works on the DigitalOcean address and in local
  // previews); the canonical tag names the full address.
  const local = /^https?:/i.test(target) ? target : "/" + target.replace(/^index\.html/, "");
  const full = absUrl(target.replace(/^index\.html/, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    file,
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>This page has moved — Robert M. Herzog</title>
  <link rel="canonical" href="${esc(full)}">
  <meta http-equiv="refresh" content="0; url=${esc(local)}">
  <script>location.replace(${JSON.stringify(local).replace(/</g, "\\u003c")});</script>
</head>
<body>
  <p>This page has moved to <a href="${esc(local)}">${esc(full)}</a>.</p>
</body>
</html>
`
  );
  redirectPages++;
}

// ---------- sitemap.xml and robots.txt ----------
// The home page and every reading page that's linked from the site: the Writing list, or a
// card in content.js (Flights, No Kidding Around). Hidden pieces that nothing links to stay out.
const contentSource = fs.readFileSync(path.join(ROOT, "content.js"), "utf8");
const linkedFromContent = new Set([...contentSource.matchAll(/read\/([a-z0-9-]+)/g)].map((m) => m[1]));
const sitemapUrls = [`${SITE_URL}/`, ...pieces.filter((p) => p.body && (p.listed || linkedFromContent.has(p.slug))).map((p) => absUrl(p.url))];
fs.writeFileSync(
  path.join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
    .map((u) => `  <url><loc>${esc(u)}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);
fs.writeFileSync(path.join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

// ---------- Report ----------
const leftovers = [...shareWarnings];
for (const p of pieces.filter((x) => x.body)) {
  const html = fs.readFileSync(path.join(OUT, p.slug, "index.html"), "utf8");
  const text = html.replace(/<[^>]+>/g, " ");
  if (/(^|\s)\*|\*(\s|$)|\]\(/.test(text)) leftovers.push(`${p.slug}: unconverted Markdown`);
  // In the text, links to the thezog.com home page and to this site's own pages (read/…, assets/…)
  // are fine; links to the old site's inner pages are not. (The head's canonical and share tags
  // use thezog.com addresses on purpose, so only <main> is checked.)
  const main = (html.match(/<main[\s\S]*<\/main>/) || [""])[0].replace(/mailto:[^"]+/g, "");
  if (/thezog\.com\/(?!read\/|assets\/|#)[^"\s<]/i.test(main)) leftovers.push(`${p.slug}: links to old thezog.com page`);
}
console.log(
  `Built ${pieces.filter((p) => p.body).length} pages, ${list.length} listed pieces, ${Object.keys(redirects).length} redirects ` +
    `(${redirectPages} redirect pages), ${sitemapUrls.length} pages in the sitemap.`
);
if (leftovers.length) console.log("Check:\n  " + leftovers.join("\n  "));
