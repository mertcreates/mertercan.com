import type { Metadata } from 'next';
import Link from 'next/link';
import ArenaContinueReading from '@/app/components/ArenaContinueReading';
import ArenaStoryIndex from '@/app/components/ArenaStoryIndex';
import Footer from '@/app/components/Footer';
import { getWritingSeries } from '@/lib/writing/registry';
import { buildWritingSeriesJsonLd, siteName, siteUrl } from '@/lib/seo';

const arenaSeries = getWritingSeries('arena');
const arenaStories = arenaSeries.entries;
const arenaJsonLd = buildWritingSeriesJsonLd(arenaSeries);

type ArenaStory = (typeof arenaStories)[number];

function getStoryHref(story: ArenaStory): string {
  return `/writing/${story.path.join('/')}`;
}

const latestStory = arenaStories.at(-1);

if (!latestStory) {
  throw new Error('Arena series must contain at least one story.');
}

const latestStoryHref = getStoryHref(latestStory);

const continuationStories = arenaStories.map((story) => ({
  slug: story.slug,
  href: getStoryHref(story),
}));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: arenaSeries.title,
  description: arenaSeries.seoDescription,
  alternates: {
    canonical: arenaSeries.hubPath,
    types: {
      'application/rss+xml': `${arenaSeries.hubPath}/feed.xml`,
    },
  },
  openGraph: {
    title: `${arenaSeries.title} — ${siteName}`,
    description: arenaSeries.seoDescription,
    url: arenaSeries.hubPath,
    siteName,
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${arenaSeries.title} — ${siteName}`,
    description: arenaSeries.seoDescription,
    creator: '@Mert_Ercan',
  },
};

export default function Arena() {
  return (
    <main className='min-h-screen'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(arenaJsonLd) }} />
      <section className='writing-content container-base pt-14 pb-24 md:pt-20 md:pb-[150px]' lang='tr'>
        <div className='mb-10 md:mb-14'>
          <Link href='/writing' className='text-ink/70 hover:text-ink/85 text-sm no-underline transition-colors'>
            ← writing
          </Link>
        </div>

        <header className='max-w-[620px]'>
          <h1 className='mb-3'>{arenaSeries.title}</h1>
          <p className='text-ink/70 mt-0! max-w-[620px] text-sm! italic'>{arenaSeries.description}</p>
          <p className='text-ink/70 mt-3 text-sm!'>{arenaStories.length} hikâye</p>

          <nav aria-label={`${arenaSeries.title} bağlantıları`} className='mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm'>
            <ArenaContinueReading stories={continuationStories} />
            <Link href={latestStoryHref} className='text-ink/70 hover:text-ink no-underline'>
              En yeni hikâye →
            </Link>
          </nav>
        </header>

        <section aria-label={`${arenaSeries.title} hikâyeleri`} className='mt-12 max-w-[620px] md:mt-16'>
          <ArenaStoryIndex stories={arenaStories} />
        </section>
      </section>

      <Footer />
    </main>
  );
}
