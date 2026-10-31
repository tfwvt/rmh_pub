/*
 * Site content for Robert M. Herzog.
 *
 * Films, books, reviews, social links and the About text come from this
 * file. To add new work, copy an existing entry in the right list, edit it,
 * and save. Writing (essays, stories, poems) lives in content/writing/ —
 * see README.md. Dates use YYYY-MM-DD; use null when a piece is undated
 * (undated pieces sort to the end of their list).
 *
 * Images live in assets/img/. Any entry without an image still renders.
 */
window.SITE = {
  person: {
    name: "Robert M. Herzog",
    roles: ["Novelist", "Screenwriter", "Essayist", "Filmmaker"],
    email: "zog@thezog.com",
    portrait: "assets/img/robert-herzog.webp",
  },

  // Shown in the header, footer and Follow section, in this order.
  social: [
    { id: "substack", label: "Substack", handle: "Robert’s Newsletter", url: "https://robertherzog.substack.com/" },
    { id: "medium", label: "Medium", handle: "@robertmherzog", url: "https://robertmherzog.medium.com/" },
    { id: "instagram", label: "Instagram", handle: "@robertzog", url: "https://www.instagram.com/robertzog" },
    { id: "tiktok", label: "TikTok", handle: "@qburto", url: "https://www.tiktok.com/@qburto" },
    { id: "amazon", label: "Amazon", handle: "Author page", url: "https://www.amazon.com/stores/Robert-M.-Herzog/author/B01FB1G4S4" },
    { id: "linktree", label: "Linktree", handle: "RobertMHerzog", url: "https://linktr.ee/RobertMHerzog" },
  ],

  newsletter: {
    url: "https://robertherzog.substack.com/subscribe",
    blurb: "Analysis and commentary about America — how we got to where we are, and what we can do to make it better.",
  },

  // The film currently being championed. Shown as the large feature band.
  featuredFilm: {
    title: "No Kidding Around",
    status: "Moving toward production",
    credits: "Written and produced by Robert M. Herzog · Co-directed by Robert M. Herzog and Dean Imperial",
    logline: "Three ordinary school days—alive with humor, connection, and innocence—are shattered by gun violence. In the aftermath, the familiar chorus of thoughts, prayers, and deflection reveals a tragedy that has become disturbingly routine.",
    about: [
      "No Kidding Around begins with three ordinary school days. A grade-school father and daughter share a small morning ritual. Two middle-school friends argue about the greatest basketball player of all time. Two high-school students tentatively discover a connection with each other. These are the moments childhood is made of: funny, awkward, tender and fleeting.",
      "Then gun violence interrupts them. The violence itself is never the spectacle. Instead, the film remains with what has been interrupted and lost—and with the now-familiar responses that follow.",
    ],
    image: "assets/img/film-no-kidding-around.webp",
    imageAlt: "An empty classroom in disarray, a child’s open lunchbox on the floor",
    laurels: [
      "Finalist — Best Drama Screenplay, Austin Short Film Festival, Fall 2026",
      "Semi-Finalist — Chicago Script Awards, 2026",
    ],
    sponsor: { name: "Fiscally sponsored by The Gotham Film & Media Institute", logo: "assets/img/logo-gotham.webp" },
    // Festival badges, shown at the bottom of the right-hand column.
    badges: [
      { image: "assets/img/badge-austin-short-film-festival.webp", alt: "Austin Short Film Festival" },
    ],
    actions: [
      { label: "Support the film", url: "https://fiscal.thegotham.org/film/5836/no-kidding-around", primary: true },
      { label: "Request the screenplay", url: "mailto:zog@thezog.com?subject=No%20Kidding%20Around%20%E2%80%94%20Screenplay%20Request" },
      { label: "Pitch deck (PDF)", url: "assets/files/no-kidding-around-pitch-deck.pdf" },
    ],
    collaborator: "Dean Imperial is a screenwriter, director and producer whose feature film CAPER premiered at SXSW in 2025. His television writing credits include Godfather of Harlem, Hotel Cocaine and Imposters.",
  },

  // Films and scripts. `kind` is shown as a label on the card.
  screen: [
    {
      title: "Flights",
      kind: "Short film",
      role: "Writer · Director",
      image: "assets/img/film-flights.webp",
      imageAlt: "Paper airplane against a white sky",
      summary: "An ordinary evening at a Williams College dorm in 1968 turns into a night of discovery. Excerpted from the novel Not Our Fathers’ Dreams.",
      quote: { text: "Herzog manages to paint a tableau of that time that rings true using little more than paper airplanes, matches, and, of course, talent.", source: "Joyce Schwarz, FilmFestivals.com" },
      laurels: ["Best Film, Short Subject — Cinevue International Film Competition"],
      festivals: [
        "Hamptons International Film Festival",
        "Los Angeles International Short Film Festival (LA Shorts Fest)",
        "Ohio Independent Film Festival",
        "IFP Buzz Cuts, sponsored by Sundance Channel",
        "Global Peace Film Festival",
        "Williamstown Film Festival",
        "Le Festival International du Film de Vol Libre, France",
        "Milwaukee International Film Festival",
        "Annapolis Film Festival",
        "daVinci Film and Video Festival",
        "Gainesville Music and Film Festival",
        "Substream International Film Festival",
      ],
      links: [{ label: "Watch, and read the director’s statement", url: "read/flights/" }],
    },
    {
      title: "Bayou’s Edge",
      kind: "Screenplay · In development",
      image: "assets/img/fiction-bayous-edge-1.webp",
      imageAlt: "Golden light over a cypress bayou",
      summary: "Amidst the sultry paddies and verdant levees of the Louisiana bayous, a crawfish farmer’s dark past threatens to erupt, endangering everything he holds dear. The story is published in two parts; the screenplay is in development.",
      links: [{ label: "Read the story", url: "#writing", internal: true, filter: "fiction" }],
    },
    {
      title: "Crawfish & Specks",
      kind: "Screenplay",
      image: "assets/img/script-crawfish-and-specks.webp",
      imageAlt: "A farmer in a boat on a flooded crawfish field",
      summary: "After Katrina came the BP Spill. A Louisiana bayou farmer must find the strength to once again fight for his threatened way of life, or lose everything that he cares about.",
    },
    {
      title: "4 Times 50, Not 200",
      kind: "Play in four courses",
      image: "assets/img/script-4-times-50.webp",
      imageAlt: "Two men sharing a long outdoor lunch",
      summary: "Over a series of grand lunches, four guys turning 50 in 1996 seek a future that better reflects the hopes of their past.",
    },
    {
      title: "Adjacent Beds",
      kind: "Work in progress",
      image: "assets/img/script-adjacent-beds.webp",
      imageAlt: "A man wearing a virtual reality headset in the dark",
      summary: "A poignant story of a son’s world of cutting edge augmented reality technology clashing with his trying to deal with his aging mother and keep his life from unraveling.",
    },
    {
      title: "Listing",
      kind: "Work in progress",
      summary: "An online erotic adventure takes a very strange turn.",
    },
  ],

  books: [
    {
      title: "Views from the Side Mirror",
      subtitle: "Essaying America",
      kind: "Essay collection",
      cover: "assets/img/book-views-from-the-side-mirror.webp",
      description: [
        "There’s the America that is, and the one that could be. These essays explore that gulf between, and how we might bridge it — from the underlying dynamic of American politics, between Republican venality and Democratic haplessness, to the surreal hours and days after 9/11 seen from Lower Manhattan.",
      ],
      quote: { text: "This collection of essays reflects beyond our current political climate; Robert draws together personal stories capturing how the personal will always be political.", source: "Pamela Chomba, fwd.us" },
      buy: [
        { label: "Paperback", url: "https://www.amazon.com/dp/0578572427" },
        { label: "Kindle", url: "https://www.amazon.com/dp/B07ZY64V48" },
      ],
    },
    {
      title: "A World Between",
      subtitle: "A Novel",
      kind: "Science fiction · The Story Plant",
      cover: "assets/img/book-a-world-between.webp",
      description: [
        "Parts of the world were disappearing: for a while, nobody noticed. Or cared. But as an increasing number of voids disrupt the fabric of reality, threatening the foundation of the world, they propel some of the greatest minds on the planet to determine what force, godlike or human, is behind the change. Now they must race to stop a dread emptiness before it leads to global oblivion.",
      ],
      badge: "Amazon best seller · Barnes & Noble e-Book of the Day",
      quote: { text: "A novel bursting with big ideas and cutting-edge science, A World Between also features a page-turning plot and vivid characters. A smartly-crafted debut novel.", source: "Rich Rubin" },
      buy: [
        { label: "Amazon", url: "https://www.amazon.com/dp/1611882176" },
        { label: "Barnes & Noble", url: "https://www.barnesandnoble.com/w/a-world-between-robert-herzog/1122946120" },
        { label: "Apple Books", url: "https://itunes.apple.com/us/book/a-world-between/id1087143185?mt=11" },
        { label: "Kobo", url: "https://www.kobo.com/us/en/ebook/a-world-between-2" },
        { label: "IndieBound", url: "https://www.indiebound.org/book/9781611882179" },
        { label: "Read Chapter One", url: "read/a-world-between-chapter-one/" },
      ],
    },
    {
      title: "Not Our Fathers’ Dreams",
      subtitle: "A Novel",
      kind: "Novel · Excerpts available",
      cover: "assets/img/book-not-our-fathers-dreams.webp",
      description: [
        "A novel of a turbulent, strange, wonderful era in American history, when ordinary events were wrapped in extraordinary circumstances. The short film Flights is excerpted from it.",
      ],
      epigraph: { text: "The weight of this sad time we must obey; speak what we feel, not what we ought to say.", source: "Edgar, King Lear" },
      buy: [
        { label: "Read Chapter One", url: "read/not-our-fathers-dreams-chapter-one/" },
        { label: "Read “That Terrible Night in June, 1968”", url: "read/that-terrible-night-in-june-1968/" },
      ],
    },
  ],

  // Reader reviews of A World Between, shown as a quote strip.
  reviews: [
    { text: "A wonderful reflection about the nature of human perception, human reality and its mysterious origins.", source: "Amazon reader" },
    { text: "This is a really modern science fiction book, based in cutting-edge reality of current physics and mathematics… The writing is lovely, with many sparkling turns of phrase, some places infused with rap, others with Joyce.", source: "Tobi LeBec" },
    { text: "A World Between challenges perceptions as only fact-based science fiction can.", source: "Dan Werner" },
    { text: "Great read. I couldn’t put it down. With a unique writing style, Herzog challenges our understanding of physics, religion and God.", source: "Mark Lieberman" },
  ],

  // Essays, op-eds, fiction, poetry and notes live in content/writing/*.md.
  // Run `node build.js` after adding or changing one.

  about: {
    lead: "Robert M. Herzog is a novelist, screenwriter, playwright and filmmaker.",
    paragraphs: [
      "He wrote, produced and directed the award-winning short film Flights, which screened at numerous festivals including the Hamptons and LA International Short Film Festival, and won Best Film — Short Subject at the Cinevue International Film Competition. His screenwriting has been recognized by Cinequest, the Los Angeles Independent Film Festival, New York Script Awards, Best Script Award London and other competitions.",
      "His published works include the novel A World Between, a Barnes & Noble e-Book of the Day, and Views from the Side Mirror, an essay collection, as well as short stories and poems in Solstice Literary Magazine, Toasted Cheese, Downstate Story, Straylight and South Jersey Underground. His essays appear on Substack, Medium and in Persuasion.",
    ],
    voice: [
      "I’ve climbed to over 22,000 feet. I remember the first great bottle of wine I ever had (a ’64 Margaux), and most since.",
      "I’ve been a CEO, COO, CMO, CFO, teacher, river runner, political consultant, actor, writer and filmmaker. And always, an entrepreneur. I’ve managed over $150 million in financings, for tech, digital and creative companies. I close deals.",
      "I live at this intersection of art and entrepreneurship, of creativity and business. Can’t say I planned it that way, but there it is.",
      "I don’t intend to be a current events commentator, another echo of RSS. A character in my play 4 Times 50, Not 200 refers to Repetitive Stupidity Syndrome (RSS) — every day enduring the same traffic jam, failure of government and corporation, sitcom joke — hoping for something different yet not finding a way to achieve it. Though I would like to help transform the world. This website is one way of expressing that hope.",
    ],
    publishedIn: ["Persuasion", "Solstice Literary Magazine", "Toasted Cheese", "Downstate Story", "Straylight", "South Jersey Underground"],
  },
};
