import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { siteName, siteUrl } from '@/lib/seo';
import { getWritingByPath, getWritingSeries } from '@/lib/writing/registry';

const description = 'A quiet record of how this site — and I — grow.';
const arenaSeries = getWritingSeries('arena');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Life',
  description,
  alternates: {
    canonical: '/life',
  },
  openGraph: {
    title: 'Life — Mert Ercan',
    description,
    url: '/life',
    siteName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life — Mert Ercan',
    description,
    creator: '@Mert_Ercan',
  },
};

type Entry = {
  date: string;
  dateTime: string;
  // Optional personal reflection. Omit until there is something to share.
  intro?: string;
  notes: LifeNote[];
};

type LifeNote = {
  text: string;
  links?: NonNullable<LifeNote['relatedLink']>[];
  relatedLink?: {
    href: string;
    label: string;
  };
};

function writingLink(path: string): NonNullable<LifeNote['relatedLink']> {
  const writing = getWritingByPath(path.split('/'));

  if (!writing) {
    throw new Error(`Life note references an unknown writing: ${path}`);
  }

  return { href: `/writing/${writing.path.join('/')}`, label: writing.title };
}

const entries: Entry[] = [
  {
    date: 'September 2026',
    dateTime: '2026-09',
    notes: [
      {
        text: arenaSeries.title,
        links: [
          writingLink('hikayeler/arena-xii-gerekce'),
          writingLink('hikayeler/arena-xiii-mudavim'),
          writingLink('hikayeler/arena-xiv-yokluk'),
          writingLink('hikayeler/arena-xv-iz'),
          writingLink('hikayeler/arena-xvi-yaninda'),
          writingLink('hikayeler/arena-xvii-birlikte'),
          writingLink('hikayeler/arena-xviii-bakis'),
          writingLink('hikayeler/arena-xix-her-zaman'),
          writingLink('hikayeler/arena-xx-mayis'),
          writingLink('hikayeler/arena-xxi-akis'),
          writingLink('hikayeler/arena-xxii-yerinde'),
          writingLink('hikayeler/arena-xxiii-sira'),
          writingLink('hikayeler/arena-xxiv-olur'),
          writingLink('hikayeler/arena-xxv-bir-sure'),
          writingLink('hikayeler/arena-xxvi-dikkat'),
          writingLink('hikayeler/arena-xxvii-merhamet'),
          writingLink('hikayeler/arena-xxviii-hala'),
          writingLink('hikayeler/arena-xxix-sonraki'),
          writingLink('hikayeler/arena-xxx-once'),
          writingLink('hikayeler/arena-xxxi-kalan'),
          writingLink('hikayeler/arena-xxxii-bir-seyler'),
          writingLink('hikayeler/arena-xxxiii-borc'),
          writingLink('hikayeler/arena-xxxiv-nobet'),
          writingLink('hikayeler/arena-xxxv-fark'),
          writingLink('hikayeler/arena-xxxvi-gorus'),
          writingLink('hikayeler/arena-xxxvii-donus'),
          writingLink('hikayeler/arena-xxxviii-bekle'),
          writingLink('hikayeler/arena-xxxix-gecerken'),
          writingLink('hikayeler/arena-xl-bu-arada'),
          writingLink('hikayeler/arena-xli-yarin'),
        ],
      },
    ],
  },
  {
    date: 'August 2026',
    dateTime: '2026-08',
    intro:
      'Writing kept moving. A talk from last year found its place here, while responsibility led to questions about healthy boundaries and subjectivity.',
    notes: [
      {
        text: 'Tedbir became the first poem published on the site.',
        relatedLink: writingLink('siirler/tedbir'),
      },
      {
        text: 'Completed the Denemeler series on the site with Sorumluluk, Sağlıklı Sınırlar, and Öznellik.',
        links: [
          writingLink('denemeler/sorumluluk'),
          writingLink('denemeler/saglikli-sinirlar'),
          writingLink('denemeler/oznellik'),
        ],
      },
      {
        text: 'Arena began with two short stories written years apart.',
        relatedLink: { href: arenaSeries.hubPath, label: arenaSeries.title },
        links: [
          writingLink('hikayeler/arena-iii-hukum'),
          writingLink('hikayeler/arena-iv-ara'),
          writingLink('hikayeler/arena-v-bekleyis'),
          writingLink('hikayeler/arena-vi-bosluk'),
          writingLink('hikayeler/arena-vii-soru'),
          writingLink('hikayeler/arena-viii-bir-kere-daha'),
          writingLink('hikayeler/arena-ix-gece'),
          writingLink('hikayeler/arena-x-seyirci'),
          writingLink('hikayeler/arena-xi-gorev'),
        ],
      },
      {
        text: "Published the talk I gave at the end of 2025 about Irvin Yalom's existential approach and leading oneself.",
        relatedLink: writingLink('liderlik-yalom-ve-kendine-liderlik-etmek'),
      },
    ],
  },
  {
    date: 'July 2026',
    dateTime: '2026-07',
    intro:
      'Writing changed shape this month. One piece became a public tool. A few essays found their place on the site, and the conversation continued.',
    notes: [
      {
        text: 'Built and launched Dizgi, a browser-based tool for laying out long-form writing as images and PDFs without changing the text. The first usable version went live in one day.',
        relatedLink: { href: '/making/dizgi', label: 'Dizgi' },
      },
      {
        text: 'Opened the Writing section for notes, essays, and small conversations.',
        relatedLink: { href: '/writing', label: 'Writing' },
      },
      {
        text: 'Added the Turkish Denemeler series, followed by Dostluk 2.',
        relatedLink: writingLink('denemeler/dostluk-2'),
      },
    ],
  },
  {
    date: 'June 2026',
    dateTime: '2026-06',
    intro:
      'A lot had been building quietly. Projects existed but the site had not caught up yet. This update was mostly about closing that gap.',
    notes: [
      {
        text: 'Added BugJar, Haklısın!, Kombin.dev, Project Canon, and two ESLint plugins to Selected Work, each with a page explaining the project in plain language.',
        relatedLink: { href: '/making', label: 'Selected Work' },
      },
      {
        text: "The creative characters (Toffee, Rozi, Fluffy) moved into the background. The approach stayed; the names didn't need to.",
      },
      {
        text: '"How I Grow" got a second paragraph. It needed more room.',
      },
      {
        text: 'Started this page to remember what was here and what changed.',
      },
    ],
  },
];

function Note({ note }: { note: LifeNote }) {
  return (
    <span className="before:text-ink/30 text-ink/80 before:mr-3 before:content-['-']">
      {note.text}
      {note.relatedLink && (
        <Link
          href={note.relatedLink.href}
          className='text-ink/70 hover:text-ink/90 decoration-ink/40 focus-visible:outline-accent ml-2 text-sm underline underline-offset-2 outline-offset-4 transition-colors focus-visible:outline-2'
        >
          {note.relatedLink.label} →
        </Link>
      )}
    </span>
  );
}

export default function Life() {
  return (
    <main className='min-h-screen'>
      <section className='container-base pt-14 pb-24 md:pt-20 md:pb-[150px]'>
        <h1 className='mb-3'>Life</h1>
        <p className='text-ink/70 mt-0! mb-8 text-sm! italic'>A quiet record of how this site — and I — grow.</p>

        <nav aria-label='Months' className='mb-14 md:mb-16'>
          <ul className='flex flex-wrap gap-x-6 gap-y-2'>
            {entries.map((entry) => (
              <li key={entry.dateTime}>
                <a
                  href={`#${entry.dateTime}`}
                  className='text-ink/70 focus-visible:outline-accent inline-flex min-h-11 items-center text-sm underline underline-offset-4 outline-offset-4 focus-visible:outline-2'
                >
                  {entry.date}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className='max-w-[620px] space-y-14 md:space-y-16'>
          {entries.map((entry) => (
            <section
              key={entry.dateTime}
              id={entry.dateTime}
              aria-labelledby={`month-${entry.dateTime}`}
              className='scroll-mt-24'
            >
              <h2
                id={`month-${entry.dateTime}`}
                className='text-ink/70 mt-0! mb-4! text-sm! font-medium tracking-wide uppercase'
              >
                <a
                  href={`#${entry.dateTime}`}
                  className='focus-visible:outline-accent no-underline! outline-offset-4 focus-visible:outline-2'
                >
                  <time dateTime={entry.dateTime}>{entry.date}</time>
                </a>
              </h2>
              {entry.intro && <p className='text-ink/75 mb-6 italic'>{entry.intro}</p>}
              <ul className='space-y-2.5'>
                {entry.notes.map((note, i) => (
                  <li key={i}>
                    {note.links ? (
                      <div className='pb-4'>
                        <Note note={note} />
                        <ul className='ms-9 mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2'>
                          {note.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                lang='tr'
                                className='text-ink/75 focus-visible:outline-accent inline-flex min-h-11 items-center text-sm underline underline-offset-4 outline-offset-4 focus-visible:outline-2'
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Note note={note} />
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
