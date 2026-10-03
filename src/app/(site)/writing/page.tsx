import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import WritingSectionNav from '@/app/components/WritingSectionNav';
import { buildWritingJsonLd, siteName, siteUrl } from '@/lib/seo';
import { getArticleWritings, getPoemWritings, getWritingKicker, getWritingSeries } from '@/lib/writing/registry';

const description =
  'Notes, poems, essays, stories, and small conversations I want to keep somewhere quieter than the feed.';
const arenaSeries = getWritingSeries('arena');
const denemelerSeries = getWritingSeries('denemeler');
const poems = getPoemWritings();
const talks = getArticleWritings();
const writingJsonLd = buildWritingJsonLd({
  entries: [...denemelerSeries.entries, ...poems, ...talks],
  description,
  series: [denemelerSeries, arenaSeries],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Writing',
  description,
  alternates: {
    canonical: '/writing',
  },
  openGraph: {
    title: 'Writing — Mert Ercan',
    description,
    url: '/writing',
    siteName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing — Mert Ercan',
    description,
    creator: '@Mert_Ercan',
  },
};

export default function Writing() {
  return (
    <main className='min-h-screen'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(writingJsonLd) }} />
      <section className='writing-content container-base pt-14 pb-24 md:pt-20 md:pb-[150px]'>
        <h1 className='mb-3'>Writing</h1>
        <p lang='en' className='text-ink/70 mt-0! mb-8 max-w-[620px] text-sm! italic md:mb-10'>
          I write about what it means to be human and how we choose to live. Here you&apos;ll find my essays, short
          stories, poetry, and a talk on leadership.
        </p>

        <WritingSectionNav />

        <section id='denemeler' aria-labelledby='denemeler-heading' className='max-w-[620px] scroll-mt-8' lang='tr'>
          <h2 id='denemeler-heading' className='mb-4 text-[1.45rem]! md:text-[1.75rem]!'>
            <Link href={denemelerSeries.hubPath} className='text-ink hover:text-ink/70 no-underline'>
              {denemelerSeries.title}
            </Link>
          </h2>
          <div className='mb-12 max-w-[58ch] space-y-5 md:mb-14'>
            {denemelerSeries.description.split('\n\n').map((paragraph) => (
              <p key={paragraph} className='text-ink/70'>
                {paragraph}
              </p>
            ))}
          </div>

          <div className='space-y-7 md:space-y-8'>
            {denemelerSeries.entries.map((essay) => (
              <article key={essay.slug}>
                <p className='text-ink/70! mb-1.5 text-sm!'>
                  {getWritingKicker(essay)} · <time dateTime={essay.date}>{essay.displayDate}</time>
                </p>
                <h3 className='mb-1.5'>
                  <Link href={`/writing/denemeler/${essay.slug}`} className='text-ink hover:text-ink/70 no-underline'>
                    {essay.title}
                  </Link>
                </h3>
                <p className='text-ink/70 mt-0! text-sm!'>{essay.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id='arena'
          aria-labelledby='arena-heading'
          className='mt-20 max-w-[620px] scroll-mt-8 md:mt-28'
          lang='tr'
        >
          <h2 id='arena-heading' className='mb-4 text-[1.45rem]! md:text-[1.75rem]!'>
            <Link href={arenaSeries.hubPath} className='text-ink hover:text-ink/70 no-underline'>
              {arenaSeries.title}
            </Link>
          </h2>
          <p className='text-ink/70 mb-6 max-w-[58ch]'>{arenaSeries.description}</p>
          <Link href={arenaSeries.hubPath} className='text-ink/70 hover:text-ink text-sm'>
            {arenaSeries.entries.length} hikâye · Seriye git →
          </Link>
        </section>

        <section
          id='siirler'
          aria-labelledby='siirler-heading'
          className='mt-20 max-w-[620px] scroll-mt-8 md:mt-28'
          lang='tr'
        >
          <h2 id='siirler-heading' className='mb-10 text-[1.45rem]! md:mb-12 md:text-[1.75rem]!'>
            Şiirler
          </h2>

          <div className='space-y-7 md:space-y-8'>
            {poems.map((poem) => (
              <article key={poem.slug}>
                <p className='text-ink/70! mb-1.5 text-sm!'>
                  {getWritingKicker(poem)} · <time dateTime={poem.date}>{poem.displayDate}</time>
                </p>
                <h3 className='mb-1.5'>
                  <Link href={`/writing/${poem.path.join('/')}`} className='text-ink hover:text-ink/70 no-underline'>
                    {poem.title}
                  </Link>
                </h3>
                <p className='text-ink/70 mt-0! text-sm!'>{poem.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id='konusmalar'
          aria-labelledby='konusmalar-heading'
          className='mt-20 max-w-[620px] scroll-mt-8 md:mt-28'
          lang='tr'
        >
          <h2 id='konusmalar-heading' className='mb-10 text-[1.45rem]! md:mb-12 md:text-[1.75rem]!'>
            Konuşmalar
          </h2>

          <div className='space-y-7 md:space-y-8'>
            {talks.map((writing) => (
              <article key={writing.slug}>
                <p className='text-ink/70! mb-1.5 text-sm!'>
                  {getWritingKicker(writing)} · <time dateTime={writing.date}>{writing.displayDate}</time>
                </p>
                <h3 className='mb-1.5'>
                  <Link href={`/writing/${writing.path.join('/')}`} className='text-ink hover:text-ink/70 no-underline'>
                    {writing.title}
                  </Link>
                </h3>
                <p className='text-ink/70 mt-0! text-sm!'>{writing.description}</p>
              </article>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
