export type ProjectStatus = 'live' | 'in progress' | 'private build' | 'paused' | 'maintenance' | 'archived';
export type ProjectKind = 'product' | 'tool' | 'creative' | 'system';

export type Project = {
  slug: string;
  title: string;
  context: string;
  year: string;
  updatedAt: string;
  type: string;
  status: ProjectStatus;
  group: 'larger' | 'small';
  kind: ProjectKind;
  story: string[];
  visual?: {
    src: string;
    alt: string;
    caption?: string;
  };
  reflections: string[];
  links?: {
    label: string;
    href: string;
  }[];
  tags?: string[];
};

export const projects = [
  {
    slug: 'bugjar',
    title: 'BugJar',
    context: 'A deterministic session envoy. It records exactly what happens, strictly within a defined scope.',
    year: '2026',
    updatedAt: '2026-06-26',
    type: 'Browser extension',
    status: 'in progress',
    group: 'larger',
    kind: 'product',
    story: [
      'BugJar started from a structural problem: the gap between a reported issue and its actual context. I needed a way to preserve the reality of a browser session — logs, network state, and the page as it changed — without relying on guesswork.',
      'The result is a deterministic session envoy. It records exactly what happens, strictly within a defined scope. There is no silent telemetry, no implicit tracking, and no external servers. Captured data never leaves the local machine. The architecture is built entirely around absolute boundaries and user control.',
      "Building it was an exercise in designing for trust. It doesn't interpret or assume; it simply provides an accurate, neutral record of what happened.",
    ],
    reflections: [
      'Reassurance comes from consistency. A tool is trusted most when its boundaries are absolute.',
      'True data sovereignty is enforced by architecture, not just by policy.',
    ],
    links: [{ label: 'bugjar.dev', href: 'https://bugjar.dev' }],
    tags: ['extension', 'architecture', 'tooling'],
  },
  {
    slug: 'haklisin',
    title: 'Haklısın!',
    context: 'A small ritual for turning everyday "haklısın" moments into a shared jar of symbolic coins.',
    year: '2026',
    updatedAt: '2026-06-26',
    type: 'Digital ritual',
    status: 'live',
    group: 'larger',
    kind: 'product',
    story: [
      'Some ideas do not begin as problems. Haklısın! began as a small inside joke: the tiny satisfaction of hearing "haklısın" after being right about something ordinary.',
      'It gives that moment somewhere to go. Each "haklısın" becomes a symbolic coin dropped into a shared digital jar — not a score, not a competition, just a small record between people who already share the joke.',
      'Building it reminded me that software does not always have to be serious to be carefully made. Sometimes, a tiny absurd idea becomes real because the structure is gentle enough to hold it.',
    ],
    reflections: [
      'Play needs structure too. The joke only works when the product stays light.',
      'A ritual becomes meaningful when it gives a small moment somewhere to live.',
      'Not every product needs to be useful in the serious sense. Some only need to feel true to the people using it.',
    ],
    links: [{ label: 'haklisin.app', href: 'https://haklisin.app' }],
    tags: ['digital ritual', 'fun', 'product'],
  },
  {
    slug: 'kombin',
    title: 'Kombin.dev',
    context: 'A quiet wardrobe analysis panel. It does not decide what to wear; it makes the stronger options visible.',
    year: '2026',
    updatedAt: '2026-06-26',
    type: 'Wardrobe analysis panel',
    status: 'private build',
    group: 'larger',
    kind: 'product',
    story: [
      'Kombin.dev started from a simple observation: choosing what to wear often feels personal, but the stronger combinations usually have a visible structure. Color relationships, silhouette, context, and repetition all leave small signals.',
      'The tool looks at the pieces already in a wardrobe and brings those signals into view. It does not praise, push, or decide. It simply makes the cleaner options easier to read.',
      'Building it was an exercise in restraint. I wanted the software to stay quiet enough for personal taste to remain intact, while still giving the decision a clearer technical shape.',
    ],
    reflections: [
      'Software does not always need to prescribe. Sometimes, structuring the options is enough.',
      'Neutral language can build more trust than enthusiastic certainty.',
      'A good tool can clarify taste without trying to replace it.',
    ],
    links: [{ label: 'kombin.dev', href: 'https://kombin.dev' }],
    tags: ['wardrobe', 'analysis', 'style'],
  },
  {
    slug: 'project-canon',
    title: 'Project Canon',
    context: 'A private system for keeping character work coherent, movable, and ready to publish.',
    year: '2026',
    updatedAt: '2026-06-26',
    type: 'System',
    status: 'private build',
    group: 'larger',
    kind: 'system',
    story: [
      'Project Canon started from a structural need: keeping character work coherent without letting the repetitive parts drag it down.',
      'It acts as a private operating layer for idea management, visual generation, review, and publishing. It keeps character history in view, suggests fresh directions without drifting, and turns approved concepts into visuals ready for review.',
      'Building it was an exercise in restraint. I wanted a system that uses AI as a working layer, not an identity. It does not try to automate creativity; it simply makes judgment easier to exercise.',
    ],
    reflections: [
      'Creative work becomes lighter when memory is reliable.',
      'A good system reduces friction without taking away control.',
      'AI works best here as a layer, not as the point.',
    ],
    links: [],
    tags: ['memory', 'workflow', 'publishing'],
  },
  {
    slug: 'steam-library-manager',
    title: 'Steam Library Manager',
    context:
      'A Windows utility for moving and maintaining game libraries, born from one friend’s repeated trips between home and university.',
    year: '2015–2025',
    updatedAt: '2026-06-26',
    type: 'Open source desktop utility',
    status: 'maintenance',
    group: 'larger',
    kind: 'tool',
    story: [
      'Steam Library Manager did not begin with a market or a feature list. A close friend spent much of university away from home, carrying games from his desktop to his laptop before leaving and moving them back when he returned.',
      'Steam’s backup flow made that routine slower and more repetitive than it needed to be. I built SLM around that specific friction: installed games and backups became libraries that could be moved, updated, restored, and managed without rebuilding everything from scratch.',
      'The project grew far beyond that first use case. It added drag-and-drop transfers, open backups, Workshop and mod preservation, compression, cleanup tools, task management, localization, and support for Origin and Uplay.',
      'What started as a tool for one friend became a public open-source project shaped by years of real issues and requests. It accumulated more than fifty releases, hundreds of stars, and a decade of maintenance.',
      'SLM is no longer under active feature development. The repository and releases remain available, and I still return when an important compatibility or safety fix needs attention.',
    ],
    reflections: [
      'I did not begin with a user segment. I began with one friend and a workaround that kept repeating.',
      'A small personal friction can travel much further once the structure around it becomes useful.',
      'Once other people depend on a tool, maintenance becomes part of the product.',
    ],
    links: [
      {
        label: 'github',
        href: 'https://github.com/mertcreates/Steam-Library-Manager',
      },
      {
        label: 'latest release',
        href: 'https://github.com/mertcreates/Steam-Library-Manager/releases/latest',
      },
    ],
    tags: ['windows', 'open source', 'game libraries'],
  },
  {
    slug: 'eslint-next-pages-router',
    title: 'eslint-plugin-next-pages-router',
    context: 'An ESLint plugin that catches invalid Pages Router routes before they reach the browser.',
    year: '2026',
    updatedAt: '2026-06-26',
    type: 'Open source tool',
    status: 'live',
    group: 'small',
    kind: 'tool',
    story: [
      'The plugin began with a routing mistake in a real Next.js project.',
      'While moving navigation flows into a rule-based system, I compared the wrong Pages Router value. I had never needed to memorise the difference between `route`, `pathname`, and `asPath` — until a message from QA made the mistake visible.',
      'Instead of adding another convention for the team to remember, I turned the distinction into an ESLint rule.',
      'The first version validated route comparisons and navigation calls against the actual `pages/` tree. Version 1.1 expanded the same idea to `next/link`, static `next.config.mjs` files, faster dynamic route lookup, and more reliable route cache invalidation.',
      'In the latest real-project benchmark, the mixed rules averaged 2.26 ms of overhead across 80 files and a 48-route Pages Router tree.',
    ],
    reflections: [
      'Good tooling shortens the distance between a mistake and its correction.',
      'Static checks are most helpful when they understand the shape of the project.',
    ],
    links: [
      {
        label: 'npm',
        href: 'https://npmjs.com/package/@mertcreates/eslint-plugin-next-pages-router',
      },
      {
        label: 'github',
        href: 'https://github.com/mertcreates/eslint-plugin-next-pages-router',
      },
    ],
    tags: ['eslint', 'next.js', 'routing'],
  },
  {
    slug: 'eslint-mv3',
    title: 'eslint-plugin-mv3',
    context: 'An ESLint plugin for catching unsafe Manifest V3 executeScript closures at lint time.',
    year: '2026',
    updatedAt: '2026-06-26',
    type: 'Open source tool',
    status: 'live',
    group: 'small',
    kind: 'tool',
    story: [
      'Manifest V3 has a small trap that is easy to miss: a function passed to scripting.executeScript is serialized before it runs. Values from the outer scope do not come with it.',
      'I wrote this plugin to catch that boundary before runtime. It checks that injected functions stay self-contained, that parameters are passed through args, and that the executeScript shape remains statically analyzable.',
      'It was a small tool built around a sharp edge. The goal was not to make extension work feel clever, but to make one fragile boundary easier to trust.',
    ],
    reflections: [
      'A linter can protect architecture, not just style.',
      'The best checks are often the ones that make hidden boundaries visible.',
    ],
    links: [
      {
        label: 'npm',
        href: 'https://npmjs.com/package/@mertcreates/eslint-plugin-mv3',
      },
      {
        label: 'github',
        href: 'https://github.com/mertcreates/eslint-plugin-mv3',
      },
    ],
    tags: ['eslint', 'mv3', 'extension'],
  },
] satisfies Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
