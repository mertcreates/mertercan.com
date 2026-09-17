import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { siteName, siteUrl } from '@/lib/seo';
import { getWritingSeries } from '@/lib/writing/registry';

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
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Mert Ercan — frontend developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life — Mert Ercan',
    description,
    creator: '@Mert_Ercan',
    images: ['/opengraph-image'],
  },
};

type Entry = {
  date: string;
  dateTime: string;
  intro?: string;
  notes: LifeNote[];
};

type LifeNote = {
  text: string;
  relatedLink?: {
    href: string;
    label: string;
  };
};

const entries: Entry[] = [
  {
    date: 'September 2026',
    dateTime: '2026-09',
    notes: [
      {
        text: 'Arena continued with a twelfth story about a man questioning the relationship between justice, friendship, and responsibility.',
        relatedLink: { href: '/writing/hikayeler/arena-xii-gerekce', label: 'Arena XII — Gerekçe' },
      },
      {
        text: 'Arena continued with a thirteenth story about a man searching for somewhere to work who wanders into a small café.',
        relatedLink: { href: '/writing/hikayeler/arena-xiii-mudavim', label: 'Arena XIII — Müdavim' },
      },
      {
        text: 'Arena continued with a fourteenth story about a familiar visitor returning to a place where the usual welcome is missing.',
        relatedLink: { href: '/writing/hikayeler/arena-xiv-yokluk', label: 'Arena XIV — Yokluk' },
      },
      {
        text: 'Arena continued with a fifteenth story about a therapist following the thread of a question through a session.',
        relatedLink: { href: '/writing/hikayeler/arena-xv-iz', label: 'Arena XV — İz' },
      },
      {
        text: 'Arena continued with a sixteenth story about a child waking to rain and reaching for what feels familiar.',
        relatedLink: { href: '/writing/hikayeler/arena-xvi-yaninda', label: 'Arena XVI — Yanında' },
      },
      {
        text: 'Arena continued with a seventeenth story about a grandmother meeting her grandchild’s joy of rain and play with a mixture of concern and curiosity.',
        relatedLink: { href: '/writing/hikayeler/arena-xvii-birlikte', label: 'Arena XVII — Birlikte' },
      },
      {
        text: 'Arena continued with an eighteenth story about a young employee stepping into a room’s attention and feeling it shift.',
        relatedLink: { href: '/writing/hikayeler/arena-xviii-bakis', label: 'Arena XVIII — Bakış' },
      },
      {
        text: 'Arena continued with a nineteenth story about a child’s questions on a rainy family visit.',
        relatedLink: { href: '/writing/hikayeler/arena-xix-her-zaman', label: 'Arena XIX — Her Zaman' },
      },
      {
        text: 'Arena continued with a twentieth story about a quiet presence and the changes that return with May.',
        relatedLink: { href: '/writing/hikayeler/arena-xx-mayis', label: 'Arena XX — Mayıs' },
      },
      {
        text: 'Arena continued with a twenty-first story about a man walking away from judgment while wind and water carry the evening onward.',
        relatedLink: { href: '/writing/hikayeler/arena-xxi-akis', label: 'Arena XXI — Akış' },
      },
      {
        text: 'Arena continued with a twenty-second story about a return to a familiar house and the traces that care leaves behind.',
        relatedLink: { href: '/writing/hikayeler/arena-xxii-yerinde', label: 'Arena XXII — Yerinde' },
      },
      {
        text: 'Arena continued with a twenty-third story about a therapist beginning a crowded day with something long left unwritten.',
        relatedLink: { href: '/writing/hikayeler/arena-xxiii-sira', label: 'Arena XXIII — Sıra' },
      },
      {
        text: 'Arena continued with a twenty-fourth story about an unanswered message carried through an ordinary day at a café.',
        relatedLink: { href: '/writing/hikayeler/arena-xxiv-olur', label: 'Arena XXIV — Olur' },
      },
      {
        text: 'Arena continued with a twenty-fifth story about an old man sitting in the rain while a brief scene unfolds across the park.',
        relatedLink: { href: '/writing/hikayeler/arena-xxv-bir-sure', label: 'Arena XXV — Bir Süre' },
      },
      {
        text: 'Arena continued with a twenty-sixth story about a mother and daughter crossing a rainy day with a familiar warning between them.',
        relatedLink: { href: '/writing/hikayeler/arena-xxvi-dikkat', label: 'Arena XXVI — Dikkat' },
      },
      {
        text: 'Arena continued with a twenty-seventh story about a family evening shaped by a child’s game and a familiar word.',
        relatedLink: { href: '/writing/hikayeler/arena-xxvii-merhamet', label: 'Arena XXVII — Merhamet' },
      },
      {
        text: 'Arena continued with a twenty-eighth story about light, shadow, and what remains present through both.',
        relatedLink: { href: '/writing/hikayeler/arena-xxviii-hala', label: 'Arena XXVIII — Hâlâ' },
      },
      {
        text: 'Arena continued with a twenty-ninth story about a quiet conversation, a notebook, and the question that lingers afterward.',
        relatedLink: { href: '/writing/hikayeler/arena-xxix-sonraki', label: 'Arena XXIX — Sonraki' },
      },
      {
        text: 'Arena continued with a thirtieth story about a quiet morning seen through a child’s eyes.',
        relatedLink: { href: '/writing/hikayeler/arena-xxx-once', label: 'Arena XXX — Önce' },
      },
      {
        text: 'Arena continued with a thirty-first story about a cleaner moving through an office after most people have gone.',
        relatedLink: { href: '/writing/hikayeler/arena-xxxi-kalan', label: 'Arena XXXI — Kalan' },
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
        relatedLink: { href: '/writing/siirler/tedbir', label: 'Tedbir' },
      },
      {
        text: 'Added Sorumluluk as the seventh part of the Turkish Denemeler series.',
        relatedLink: { href: '/writing/denemeler/sorumluluk', label: 'Sorumluluk' },
      },
      {
        text: 'Added Sağlıklı Sınırlar as the eighth part of the Turkish Denemeler series.',
        relatedLink: { href: '/writing/denemeler/saglikli-sinirlar', label: 'Sağlıklı Sınırlar' },
      },
      {
        text: 'Added Öznellik as the ninth and final part of the Turkish Denemeler series.',
        relatedLink: { href: '/writing/denemeler/oznellik', label: 'Öznellik' },
      },
      {
        text: 'Arena began with two short stories written years apart.',
        relatedLink: { href: arenaSeries.hubPath, label: arenaSeries.title },
      },
      {
        text: 'Arena continued with a third story about a king questioning the role he was given and the judgment expected of him.',
        relatedLink: { href: '/writing/hikayeler/arena-iii-hukum', label: 'Arena III — Hüküm' },
      },
      {
        text: 'Arena continued with a fourth story about a couple taking a brief pause beneath the rain.',
        relatedLink: { href: '/writing/hikayeler/arena-iv-ara', label: 'Arena IV — Ara' },
      },
      {
        text: 'Arena continued with a fifth story about a woman keeping watch through rain and memory.',
        relatedLink: { href: '/writing/hikayeler/arena-v-bekleyis', label: 'Arena V — Bekleyiş' },
      },
      {
        text: 'Arena continued with a sixth story about an advisor facing a silence that changes the shape of his role.',
        relatedLink: { href: '/writing/hikayeler/arena-vi-bosluk', label: 'Arena VI — Boşluk' },
      },
      {
        text: 'Arena continued with a seventh story about a question that follows a man out of a gladiator dream.',
        relatedLink: { href: '/writing/hikayeler/arena-vii-soru', label: 'Arena VII — Soru' },
      },
      {
        text: 'Arena continued with an eighth story about a mother caught between an urgent journey and her son’s wish to play one more time.',
        relatedLink: { href: '/writing/hikayeler/arena-viii-bir-kere-daha', label: 'Arena VIII — Bir Kere Daha' },
      },
      {
        text: 'Arena continued with a ninth story about a couple giving themselves more time on an evening beyond their plans.',
        relatedLink: { href: '/writing/hikayeler/arena-ix-gece', label: 'Arena IX — Gece' },
      },
      {
        text: 'Arena continued with a tenth story about a woman who finds herself inside a crowd moving as one.',
        relatedLink: { href: '/writing/hikayeler/arena-x-seyirci', label: 'Arena X — Seyirci' },
      },
      {
        text: 'Arena continued with an eleventh story about a man called to solve a problem and the role waiting for him in the room.',
        relatedLink: { href: '/writing/hikayeler/arena-xi-gorev', label: 'Arena XI — Görev' },
      },
      {
        text: "Added the leadership talk I presented on stage at the end of 2025, connecting Irvin Yalom's existential approach with leading oneself.",
        relatedLink: {
          href: '/writing/liderlik-yalom-ve-kendine-liderlik-etmek',
          label: 'Liderlik, Yalom ve Kendine Liderlik Etmek',
        },
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
        text: 'Built and launched Dizgi, a browser-based tool that turns long-form writing into carefully paginated images and PDFs without rewriting the text.',
        relatedLink: { href: '/making/dizgi', label: 'Dizgi' },
      },
      {
        text: 'The first usable version went from idea to a live product in one day, with rendered-layout pagination, intentional page breaks, typography and background controls, previews, and image and PDF export.',
      },
      {
        text: 'Added Dizgi to Selected Work and gave it a dedicated /making page.',
      },
      {
        text: 'Added /writing as a quieter place for notes, essays, and small conversations.',
        relatedLink: { href: '/writing', label: 'Writing' },
      },
      {
        text: 'Brought the Turkish Denemeler series into the site without turning the whole site multilingual.',
      },
      {
        text: 'Added Dostluk 2 as the next part of the Turkish Denemeler series.',
        relatedLink: { href: '/writing/denemeler/dostluk-2', label: 'Dostluk 2' },
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
        text: 'Added BugJar, Haklısın!, Kombin.dev, Project Canon, and two ESLint plugins to Selected Work. Built dedicated /making pages for each, and stripped away the "marketing" voice in favor of a calm, structural record.',
        relatedLink: { href: '/making', label: 'Selected Work' },
      },
      {
        text: "The creative characters (Toffee, Rozi, Fluffy) moved into the background. The approach stayed; the names didn't need to.",
      },
      {
        text: '"How I Grow" got a second paragraph. It needed more room.',
      },
      {
        text: 'This page — as a place to remember what was here and what changed.',
      },
    ],
  },
];

export default function Life() {
  return (
    <main className='min-h-screen'>
      <section className='container-base pt-14 pb-24 md:pt-20 md:pb-[150px]'>
        <h1 className='mb-3'>Life</h1>
        <p className='text-ink/70 mt-0! mb-16 text-sm! italic md:mb-20'>
          A quiet record of how this site — and I — grow.
        </p>

        <div className='max-w-[620px] space-y-14 md:space-y-16'>
          {entries.map((entry) => (
            <div key={entry.date}>
              <h2 className='text-ink/70 mt-0! mb-4! text-sm! font-medium tracking-wide uppercase'>
                <time dateTime={entry.dateTime}>{entry.date}</time>
              </h2>
              {entry.intro && <p className='text-ink/75 mb-6 italic'>{entry.intro}</p>}
              <ul className='space-y-2.5'>
                {entry.notes.map((note, i) => (
                  <li key={i} className="before:text-ink/30 text-ink/80 list-none before:mr-3 before:content-['-']">
                    {note.text}
                    {note.relatedLink && (
                      <Link
                        href={note.relatedLink.href}
                        className='text-ink/70 hover:text-ink/90 decoration-ink/40 ml-2 text-sm underline underline-offset-2 transition-colors'
                      >
                        {note.relatedLink.label} →
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
