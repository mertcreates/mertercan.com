export type ProjectStatus = 'live' | 'in progress' | 'private build' | 'paused' | 'maintenance' | 'archived';
export type ProjectKind = 'product' | 'tool' | 'creative' | 'system';
export type ProjectSchemaType = 'SoftwareApplication' | 'WebApplication' | 'SoftwareSourceCode' | 'CreativeWork';
export type ProjectLinkKind = 'website' | 'github' | 'npm' | 'release' | 'benchmark';

export type Project = {
  slug: string;
  title: string;
  context: string;
  metaDescription?: string;
  year: string;
  publishedAt?: string;
  updatedAt: string;
  pageReviewedAt: string;
  type: string;
  status: ProjectStatus;
  schemaType: ProjectSchemaType;
  group: 'larger' | 'small';
  kind: ProjectKind;
  story: string[];
  visual?: {
    src: string;
    alt: string;
    caption?: string;
  };
  howItWorks: string[];
  facts?: string[];
  links?: {
    kind: ProjectLinkKind;
    label: string;
    href: string;
  }[];
  tags?: string[];
};

export const projects = [
  {
    slug: 'bugjar',
    title: 'BugJar',
    context: 'A local-first browser session recorder that preserves what happened within a scope the user defines.',
    metaDescription:
      'BugJar is a browser extension by Mert Ercan for recording scoped browser sessions locally, without background telemetry or cloud uploads.',
    year: '2026',
    updatedAt: '2026-09-06',
    pageReviewedAt: '2026-09-20',
    type: 'Browser extension',
    status: 'in progress',
    schemaType: 'SoftwareApplication',
    group: 'larger',
    kind: 'product',
    story: [
      'BugJar began with the gap between a reported issue and the context needed to understand it. I wanted a browser session to carry its own evidence: console logs, network activity, DOM changes, and the sequence that connected them, instead of leaving the investigation to memory and guesswork.',
      'The recorder only runs where the user allows it to. Sessions stay on the local machine unless they are deliberately exported; there is no background telemetry or cloud upload built into the recording flow.',
      'The harder problem was not capture alone, but trust. Every boundary had to remain visible: where recording can happen, when it is active, and what is allowed to leave the device.',
    ],
    howItWorks: [
      'The user defines the domains, paths, and URL patterns where recording is allowed; capture stays inside that scope.',
      'DOM changes, network requests, console logs, and user interactions are recorded as separate channels in one ordered session.',
      'Sessions remain in local browser storage for replay and leave the device only through an explicit export.',
    ],
    links: [{ kind: 'website', label: 'official product site', href: 'https://bugjar.dev' }],
    tags: ['extension', 'architecture', 'tooling'],
  },
  {
    slug: 'dizgi',
    title: 'Dizgi',
    context:
      'A writing tool that turns long-form text into carefully paginated images and PDFs without rewriting the words.',
    metaDescription:
      'Dizgi is a browser-based writing tool by Mert Ercan for turning long-form text into carefully paginated, shareable images and PDFs.',
    year: '2026',
    publishedAt: '2026-07-04',
    updatedAt: '2026-09-19',
    pageReviewedAt: '2026-09-20',
    type: 'Writing and export tool',
    status: 'live',
    schemaType: 'WebApplication',
    group: 'larger',
    kind: 'tool',
    story: [
      'Dizgi began while I was reading a long piece of writing shared as a series of screenshots. It felt like a small window into another person’s inner world; the writing held my attention, while the format kept interrupting it. I had felt the same friction while preparing my own writing in Canva, where every page break and layout adjustment had to be handled manually.',
      'I built the first usable version in a day around a simple boundary: the tool should shape the text, not rewrite it. Dizgi measures the rendered layout, flows writing across pages, respects intentional page breaks, and updates the result as the format, typography, spacing, and background change.',
      'The finished pages can be previewed and exported as images or a PDF. The aim is not to turn writing into content strategy, but to make the original words easier to read, share, and keep.',
    ],
    howItWorks: [
      'Dizgi measures the rendered text and flows it across pages instead of estimating page breaks from a fixed character count.',
      'Writers can combine automatic pagination with intentional page breaks, then adjust format, typography, spacing, and background in a live preview.',
      'The browser produces vertical, square, or story-sized pages that can be exported as PNG images or a PDF.',
    ],
    links: [{ kind: 'website', label: 'official product site', href: 'https://dizgi.app' }],
    tags: ['writing', 'pagination', 'typography'],
  },
  {
    slug: 'haklisin',
    title: 'Haklısın!',
    context:
      'A small ritual for turning everyday "haklısın" moments into symbolic coins kept in a personal digital jar.',
    metaDescription:
      'Haklısın! is a small web ritual by Mert Ercan for keeping everyday "haklısın" moments as symbolic coins in a personal digital jar.',
    year: '2026',
    updatedAt: '2026-09-19',
    pageReviewedAt: '2026-09-20',
    type: 'Digital ritual',
    status: 'live',
    schemaType: 'WebApplication',
    group: 'larger',
    kind: 'product',
    story: [
      'Some ideas do not begin as problems. Haklısın! began as a small inside joke: the brief satisfaction of hearing "haklısın" after being right about something ordinary.',
      'Each moment becomes a symbolic coin in a personal digital jar. The count is part of the joke; the point is to give a passing "I told you so" somewhere to stay.',
      'Building it reminded me that software can be carefully made without becoming serious. Sometimes a tiny absurdity only needs enough structure to turn into a ritual.',
    ],
    howItWorks: [
      'Each signed-in user has a personal jar for the moments they decide to record.',
      'The user chooses what one moment is worth and gives that unit its own name and symbol.',
      'When a moment is acknowledged, it is added to the jar as a dated symbolic entry that can be revisited later.',
    ],
    links: [{ kind: 'website', label: 'official product site', href: 'https://haklisin.app' }],
    tags: ['digital ritual', 'fun', 'product'],
  },
  {
    slug: 'kombin',
    title: 'Kombin.dev',
    context:
      'A personal wardrobe system that builds and evaluates outfits from the clothes already there, without reducing the decision to a single score.',
    metaDescription:
      'Kombin.dev is a private wardrobe and outfit-planning system by Mert Ercan that evaluates real combinations across technical harmony, daily practicality, context, and perceived impact.',
    year: '2026',
    updatedAt: '2026-08-27',
    pageReviewedAt: '2026-09-20',
    type: 'Wardrobe and outfit system',
    status: 'private build',
    schemaType: 'WebApplication',
    group: 'larger',
    kind: 'product',
    story: [
      'Choosing what to wear feels intuitive, but a wardrobe still contains structure: colors that interact, silhouettes that shift proportion, materials that behave differently through the day, and pieces that quietly fall into repetition.',
      'Kombin.dev works only with the clothes already in the wardrobe. It builds and compares possible outfits, then reads each one across four separate dimensions: technical harmony, real-life practicality, contextual fit, and the impression it creates from the outside.',
      'The central distinction is between what belongs to the outfit and what belongs to the day. Color, silhouette, and seasonal construction form the technical reading; weather, comfort, context, repeat history, and carrying needs refine the recommendation without rewriting that foundation.',
      'The system can suggest and explain, but it cannot invent a missing piece or collapse taste into one final verdict. The trade-offs become visible; the choice remains personal.',
    ],
    howItWorks: [
      'Candidate outfits are assembled only from items already recorded in the wardrobe.',
      'Each combination keeps technical harmony, daily practicality, contextual fit, and perceived impact as separate readings rather than collapsing them into one verdict.',
      'Weather, the day’s context, and recent outfit history refine the recommendation, while saved outfits retain their pieces, reasoning, scores, and styling notes.',
    ],
    links: [{ kind: 'website', label: 'official project site', href: 'https://kombin.dev' }],
    tags: ['wardrobe', 'outfit planning', 'analysis'],
  },
  {
    slug: 'project-canon',
    title: 'Project Canon',
    context: 'A private system for keeping character work coherent from first idea through review and publishing.',
    metaDescription:
      'Project Canon is a private creative system by Mert Ercan for preserving continuity across character ideation, review, and publishing.',
    year: '2026',
    updatedAt: '2026-06-26',
    pageReviewedAt: '2026-09-20',
    type: 'System',
    status: 'private build',
    schemaType: 'CreativeWork',
    group: 'larger',
    kind: 'system',
    story: [
      'Project Canon grew from a practical need: character work was spreading across ideas, references, prompts, revisions, and publishing steps, while continuity still depended on memory.',
      'The system brings those parts into one workflow. It keeps character history close, helps new directions remain consistent, and moves approved concepts into a clear review and publishing path.',
      'AI is present as a working layer, not the identity of the project. The system does not replace judgment; it keeps repetitive work from obscuring it.',
    ],
    howItWorks: [
      'Character history, approved references, prompts, and revisions stay together as one continuity record.',
      'New directions are reviewed against that record before they become part of the character’s accepted history.',
      'Approved concepts move through a defined review and publishing path while creative judgment remains with the author.',
    ],
    links: [],
    tags: ['memory', 'workflow', 'publishing'],
  },
  {
    slug: 'steam-library-manager',
    title: 'Steam Library Manager',
    context:
      'A Windows utility for moving and maintaining game libraries, built around one friend’s repeated trips between home and university.',
    metaDescription:
      'Steam Library Manager is an open-source Windows utility by Mert Ercan for moving, restoring, and maintaining game libraries.',
    year: '2015–2025',
    updatedAt: '2025-07-13',
    pageReviewedAt: '2026-09-20',
    type: 'Open source desktop utility',
    status: 'maintenance',
    schemaType: 'SoftwareApplication',
    group: 'larger',
    kind: 'tool',
    story: [
      'Steam Library Manager did not begin with a market or a feature list. A close friend spent much of university away from home, carrying games from his desktop to his laptop before leaving and moving them back when he returned.',
      'Steam’s backup flow made that routine slower and more repetitive than it needed to be. I built SLM around that specific friction: installed games and backups became libraries that could be moved, updated, restored, and managed without rebuilding everything from scratch.',
      'The project grew far beyond that first use case. It added drag-and-drop transfers, open backups, Workshop and mod preservation, compression, cleanup tools, task management, localization, and support for Origin and Uplay.',
      'What began as a tool for one friend became a public open-source project shaped by years of issues, requests, and real use. It grew through more than fifty releases, hundreds of stars, and a decade of maintenance.',
      'SLM is no longer under active feature development. The repository and releases remain available, and I still return when an important compatibility or safety fix needs attention.',
    ],
    howItWorks: [
      'Installed games and backups are represented as libraries that can be moved between drives without rebuilding each installation from scratch.',
      'Transfers, updates, restores, compression, cleanup, and queued tasks are managed from one Windows application.',
      'The same library model expanded beyond Steam to support Origin and Uplay while preserving Workshop and mod data where applicable.',
    ],
    facts: [
      'The public repository had 52 GitHub releases and 637 stars when this page was reviewed on 20 September 2026.',
    ],
    links: [
      {
        kind: 'github',
        label: 'source repository',
        href: 'https://github.com/mertcreates/Steam-Library-Manager',
      },
      {
        kind: 'release',
        label: 'release archive',
        href: 'https://github.com/mertcreates/Steam-Library-Manager/releases/latest',
      },
    ],
    tags: ['windows', 'open source', 'game libraries'],
  },
  {
    slug: 'eslint-next-pages-router',
    title: 'eslint-plugin-next-pages-router',
    context: 'An ESLint plugin that catches invalid Pages Router routes before they reach the browser.',
    metaDescription:
      'eslint-plugin-next-pages-router is an ESLint plugin by Mert Ercan for validating Next.js Pages Router routes against the project’s actual pages tree.',
    year: '2026',
    updatedAt: '2026-09-13',
    pageReviewedAt: '2026-09-20',
    type: 'Open source tool',
    status: 'live',
    schemaType: 'SoftwareSourceCode',
    group: 'small',
    kind: 'tool',
    story: [
      'The plugin began with a routing mistake in a real Next.js project.',
      'The bug came from comparing the wrong Pages Router value. The difference between `route`, `pathname`, and `asPath` had stayed invisible until QA surfaced a mismatch in one of the navigation flows.',
      'Instead of adding another convention for the team to remember, I turned the distinction into an ESLint rule.',
      'The first version checked route comparisons and navigation calls against the actual `pages/` tree. Version 1.1 extended the same model to `next/link`, static `next.config.mjs` files, faster dynamic-route lookup, and more reliable cache invalidation.',
      'Version 1.2.1 added conservative validation for definitely missing dynamic query parameters without reporting runtime-built query objects it cannot prove wrong.',
    ],
    howItWorks: [
      'The plugin builds a route model from the project’s `pages/` tree, including static, dynamic, catch-all, and optional catch-all routes.',
      'One rule checks comparisons against `route`, `pathname`, and `asPath`; the other checks `router.push`, `router.replace`, and `next/link` navigation targets.',
      'Optional Next.js configuration support applies `basePath` and locales, while unresolved runtime values are left alone rather than guessed.',
    ],
    facts: [
      'The published package is version 1.2.1 and supports ESLint 8–9, Node.js 16+, and Next.js 10+ projects using the Pages Router.',
      'The verified 1.2.0–1.2.1 benchmark found overlapping timing ranges rather than a measurable speedup or regression; its fixture workload produced 150 additional missing-parameter diagnostics in 1.2.1.',
    ],
    links: [
      {
        kind: 'npm',
        label: 'npm package',
        href: 'https://npmjs.com/package/@mertcreates/eslint-plugin-next-pages-router',
      },
      {
        kind: 'github',
        label: 'source repository',
        href: 'https://github.com/mertcreates/eslint-plugin-next-pages-router',
      },
      {
        kind: 'benchmark',
        label: 'benchmark methodology and results',
        href: 'https://github.com/mertcreates/eslint-plugin-next-pages-router/blob/main/BENCHMARKS.md',
      },
    ],
    tags: ['eslint', 'next.js', 'routing'],
  },
  {
    slug: 'eslint-mv3',
    title: 'eslint-plugin-mv3',
    context:
      'An ESLint plugin that catches outer-scope references inside Manifest V3 `executeScript` functions before runtime.',
    metaDescription:
      'eslint-plugin-mv3 is an ESLint plugin by Mert Ercan for catching Manifest V3 `executeScript` closure traps before runtime.',
    year: '2026',
    updatedAt: '2026-02-16',
    pageReviewedAt: '2026-09-20',
    type: 'Open source tool',
    status: 'live',
    schemaType: 'SoftwareSourceCode',
    group: 'small',
    kind: 'tool',
    story: [
      'Manifest V3 has a small trap that is easy to miss: a function passed to `scripting.executeScript` is serialized before it runs. Values from the outer scope do not come with it.',
      'I wrote the plugin to make that boundary visible before runtime. It rejects injected functions that depend on outer-scope values, requires parameters to travel through `args`, and keeps the call shape statically analyzable.',
      'It is a small tool for one sharp edge: not to make extension development feel clever, but to make a fragile runtime boundary easier to trust.',
    ],
    howItWorks: [
      'The rule resolves the function passed to `chrome.scripting.executeScript` or `browser.scripting.executeScript` and verifies that it is local and self-contained.',
      'Outer-scope captures and imported function references are rejected because those values do not survive function serialization.',
      'Parameters must travel through a statically readable `args` array; dynamic call shapes that cannot be verified are rejected explicitly.',
    ],
    facts: [
      'The published package is version 1.0.0 and supports ESLint versions from 8.50.0 up to, but not including, 10.',
      'The documented benchmark measured a 2.96 ms median net rule cost on a 4,999-line baseline and 16.19 ms on a 30,006-line mixed worst-case fixture.',
    ],
    links: [
      {
        kind: 'npm',
        label: 'npm package',
        href: 'https://npmjs.com/package/@mertcreates/eslint-plugin-mv3',
      },
      {
        kind: 'github',
        label: 'source repository',
        href: 'https://github.com/mertcreates/eslint-plugin-mv3',
      },
      {
        kind: 'benchmark',
        label: 'benchmark methodology and results',
        href: 'https://github.com/mertcreates/eslint-plugin-mv3/blob/main/BENCHMARK.md',
      },
    ],
    tags: ['eslint', 'mv3', 'extension'],
  },
] satisfies Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
