/*
 * The home page's behaviour. The page's sections are already in its HTML (build.js writes them
 * from content.js and content/writing/*.md, with build-home.js); this file only adds what needs
 * a browser: the Writing filters, search and "Show more", the film strips' fit, the header's
 * shadow, and the scroll back to a card when a reading page links back to it.
 */
(function () {
  "use strict";

  // ---------- Helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const slot = (name) => $(`[data-slot="${name}"]`);

  // ---------- Featured film ----------
  // Film strips: fit a whole number of sprocket tiles (34px or a little less) across the band,
  // between the extra black at each end (--sprocket-end in styles.css).
  const band = slot("featured-film");
  if (band && band.firstElementChild) {
    const fitSprockets = () => {
      const end = parseFloat(getComputedStyle(band).getPropertyValue("--sprocket-end")) || 0;
      const w = band.clientWidth - 2 * end;
      if (w) band.style.setProperty("--sprocket-tile", `${w / Math.ceil(w / 34)}px`);
    };
    fitSprockets();
    if ("ResizeObserver" in window) new ResizeObserver(fitSprockets).observe(band);
  }

  // A link with data-back="<id>" (the band's "Find out more about the project") asks the reading
  // page it opens to point its back links at #<id> instead of the piece's card; the script at the
  // end of templates/article.html does that. Any other link to a reading page (e.g. the No Kidding
  // Around card) clears it, so those back links go to the card as usual.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || a.origin !== location.origin || !a.pathname.includes("/read/")) return;
    try {
      if (a.dataset.back) sessionStorage.setItem("backTo", JSON.stringify({ path: a.pathname, hash: "#" + a.dataset.back }));
      else sessionStorage.removeItem("backTo");
    } catch {}
  });

  // ---------- Writing ----------
  // Every card is in the page; the filters, search and "Show more" hide and show them. The page
  // arrives showing the first PAGE cards (WRITING_PAGE in build-home.js).
  const PAGE = 9;
  const state = { kind: "all", q: "", limit: PAGE };
  const grid = slot("writing");
  const moreBtn = slot("more");
  const searchInput = slot("search");
  const filtersEl = slot("filters");

  // Search looks in each card's title, publication and summary.
  const cards = [...grid.querySelectorAll(".piece")].map((el) => ({
    el,
    kind: el.dataset.kind,
    text: ["h3", ".piece-venue", ".piece-dek"].map((sel) => $(sel, el)?.textContent || "").join(" ").toLowerCase(),
  }));
  const empty = document.createElement("p");
  empty.className = "writing-empty";
  empty.hidden = true;
  grid.append(empty);

  function renderWriting() {
    const q = state.q.trim().toLowerCase();
    let matches = 0;
    for (const c of cards) {
      const match = (state.kind === "all" || c.kind === state.kind) && (!q || c.text.includes(q));
      if (match) matches++;
      c.el.hidden = !match || matches > state.limit;
    }
    empty.hidden = matches > 0;
    empty.textContent = `Nothing matches “${state.q}”.`;
    moreBtn.hidden = matches <= state.limit;
    moreBtn.textContent = `Show more (${matches - Math.min(matches, state.limit)})`;
    filtersEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.kind === state.kind)));
  }

  function setKind(kind) {
    state.kind = kind;
    state.limit = PAGE;
    renderWriting();
  }

  filtersEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) setKind(chip.dataset.kind);
  });
  searchInput.addEventListener("input", () => {
    state.q = searchInput.value;
    state.limit = PAGE;
    renderWriting();
  });
  moreBtn.addEventListener("click", () => {
    state.limit += PAGE;
    renderWriting();
  });
  // Links elsewhere on the page (e.g. "Read the story") can pre-select a filter.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-filter]");
    if (a) setKind(a.dataset.filter);
  });

  // ---------- Header ----------
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // The name links to the site root. Here on the home page, scroll up instead of reloading,
  // and tidy the address to the root too (no index.html or #section left in it).
  $(".wordmark").addEventListener("click", (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // new tab etc.
    e.preventDefault();
    window.scrollTo({ top: 0 });
    history.replaceState(null, "", e.currentTarget.href);
  });

  renderWriting();

  // ---------- Arriving at a section or card ----------
  // Reading pages link back to their piece's card (index.html#short-fiction-totem,
  // #writing-<name>, a Screen & Stage card such as #work-flights or a book such as
  // #book-board-to-death), and old thezog.com addresses forward to sections (#books, #about).
  // The Writing list shows nine cards at a time, so first show enough to include the card,
  // then scroll to it. It's scrolled to again once the fonts and images have loaded (the
  // browser's own jump comes before they have, so it can land a little off), unless the
  // reader has started scrolling by then.
  const target = decodeURIComponent(location.hash.slice(1));
  if (target) {
    if (target.startsWith("writing-")) {
      const i = cards.findIndex((c) => c.el.id === target);
      if (i >= state.limit) {
        state.limit = Math.ceil((i + 1) / PAGE) * PAGE;
        renderWriting();
      }
    }
    const card = document.getElementById(target);
    if (card) {
      let moved = false;
      const stop = () => (moved = true);
      ["wheel", "touchstart", "keydown"].forEach((t) => addEventListener(t, stop, { once: true, passive: true }));
      const go = () => !moved && card.scrollIntoView({ block: "start", behavior: "instant" });
      go();
      if (document.readyState === "complete") return;
      addEventListener("load", go, { once: true });
    }
  }
})();
