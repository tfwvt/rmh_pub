#!/usr/bin/env node
/*
 * Builds the reading pages from content/writing/*.md.
 *
 *   node build.js
 *
 * Writes:
 *   read/<slug>/index.html   one page per piece that has body text
 *   writing.js               the list the home page shows under "Writing"
 *   404.html                 sends old thezog.com addresses to their new pages
 *
 * No dependencies; needs Node 18 or newer.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const SRC = path.join(ROOT, "content", "writing");
const OUT = path.join(ROOT, "read");

const KIND_LABELS = { essay: "Essay", oped: "Op-Ed", fiction: "Fiction", poetry: "Poetry", notes: "Notes", film: "Film" };

// ---------- Site settings (social links etc.) from content.js ----------
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content.js"), "utf8"), sandbox);
const SITE = sandbox.window.SITE;

// ---------- Front matter ----------
function parseFile(file) {
  const text = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing front matter`);
  const meta = { links: [], legacy: [] };
  let list = null;
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && list) {
      if (list === "links") {
        const i = item[1].indexOf(": ");
        meta.links.push({ label: item[1].slice(0, i).trim(), url: item[1].slice(i + 2).trim() });
      } else meta[list].push(item[1].trim());
      continue;
    }
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: can't read line "${line}"`);
    const [, key, value] = kv;
    if (value === "") list = key;
    else {
      list = null;
      meta[key] = value;
    }
  }
  meta.slug = path.basename(file, ".md");
  meta.body = m[2].trim();
  meta.listed = meta.listed !== "false";
  return meta;
}

// ---------- Markdown ----------
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const isAbsolute = (u) => /^(https?:|mailto:|tel:|#|\/\/)/i.test(u);
const fixUrl = (u, prefix) => (isAbsolute(u) ? u : prefix + u);
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

// ---------- Load ----------
const pieces = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parseFile(path.join(SRC, f)))
  .sort(byDate);

for (const p of pieces) {
  if (!p.title || !p.kind) throw new Error(`${p.slug}: title and kind are required`);
  if (!p.body && !p.links.length) throw new Error(`${p.slug}: needs body text or at least one link`);
  p.url = p.body ? `read/${p.slug}/` : null;
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

fs.rmSync(OUT, { recursive: true, force: true });
const listed = pieces.filter((p) => p.listed);

for (const p of pieces.filter((x) => x.body)) {
  const prefix = "../../";
  const more = listed
    .filter((x) => x.slug !== p.slug && x.kind === p.kind)
    .slice(0, 3)
    .map((x) => {
      const href = x.url ? prefix + x.url : x.links[0].url;
      return `<li><a href="${esc(href)}"${linkTarget(href)}><span class="more-title">${esc(plain(x.title))}</span><span class="more-meta">${esc(fmtDate(x))}</span></a></li>`;
    })
    .join("");
  const meta = [kindLabel(p), fmtDate(p)].filter(Boolean).map(esc).join(" · ");
  const vars = {
    prefix,
    title: esc(plain(p.title)),
    description: esc(plain(p.dek || p.body.slice(0, 160))),
    meta,
    dek: p.dek ? `<p class="article-dek">${inline(p.dek, prefix)}</p>` : "",
    venue: p.venue ? `<p class="article-venue">${esc(p.venue)}</p>` : "",
    // No lead image for poems, or when the image already appears in the text.
    hero: p.image && p.kind !== "poetry" && !p.body.includes(p.image)
      ? `<figure class="article-hero"><img src="${esc(fixUrl(p.image, prefix))}" alt=""${p.imagePosition ? ` style="object-position:${esc(p.imagePosition)}"` : ""}></figure>`
      : "",
    ogImage: p.image ? esc(fixUrl(p.image, prefix)) : `${prefix}assets/img/robert-herzog.jpg`,
    body: markdown(p.body, prefix),
    proseClass: p.kind === "poetry" ? "prose prose-poem" : "prose",
    alsoOn: p.links.length
      ? `<div class="also-on"><span>Also published on</span>${p.links
          .map((l) => `<a class="platform" href="${esc(l.url)}"${linkTarget(l.url)}>${linkIcon(l.label)}${esc(l.label)}</a>`)
          .join("")}</div>`
      : "",
    more: more
      ? `<section class="more"><div class="wrap-narrow"><p class="eyebrow">More ${esc(kindLabel(p).toLowerCase())}</p><ul class="more-list">${more}</ul><a class="text-link" href="${prefix}index.html#writing">All writing →</a></div></section>`
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

// ---------- writing.js ----------
const list = listed.map((p) => {
  const o = { kind: p.kind, title: p.title, dek: p.dek || "", date: p.date || null };
  for (const k of ["dateLabel", "venue", "image", "imagePosition", "url"]) if (p[k]) o[k] = p[k];
  o.links = p.links;
  return o;
});
fs.writeFileSync(
  path.join(ROOT, "writing.js"),
  `// Generated by build.js from content/writing/*.md. Do not edit by hand.\nwindow.SITE_WRITING = ${JSON.stringify(list, null, 2)};\n`
);

// ---------- 404.html with redirects from the old site ----------
const redirects = {
  "/novel": "index.html#books",
  "/essayingamerica": "index.html#books",
  "/testimonials": "index.html#books",
  "/no-kidding-around": "index.html#film",
  "/new-page-2": "index.html#screen",
  "/the-country-annex": "index.html#about",
  "/contact": "index.html#follow",
  "/contact-2": "index.html#follow",
  "/blog": "index.html#writing",
  "/fiction": "index.html#writing",
  "/opedipal-nonfiction": "index.html#writing",
};
for (const p of pieces) for (const old of p.legacy) redirects[old.toLowerCase().replace(/\/+$/, "")] = p.url || p.links[0].url;
const notFound = fs.readFileSync(path.join(ROOT, "templates", "404.html"), "utf8");
fs.writeFileSync(path.join(ROOT, "404.html"), fill(notFound, { redirects: JSON.stringify(redirects, null, 2) }));

// ---------- Report ----------
const leftovers = [];
for (const p of pieces.filter((x) => x.body)) {
  const html = fs.readFileSync(path.join(OUT, p.slug, "index.html"), "utf8");
  const text = html.replace(/<[^>]+>/g, " ");
  if (/(^|\s)\*|\*(\s|$)|\]\(/.test(text)) leftovers.push(`${p.slug}: unconverted Markdown`);
  // Links to the thezog.com home page are fine; links to its old inner pages are not.
  if (/thezog\.com\/[^"\s<]/i.test(html.replace(/mailto:[^"]+/g, ""))) leftovers.push(`${p.slug}: links to old thezog.com page`);
}
console.log(`Built ${pieces.filter((p) => p.body).length} pages, ${list.length} listed pieces, ${Object.keys(redirects).length} redirects.`);
if (leftovers.length) console.log("Check:\n  " + leftovers.join("\n  "));
