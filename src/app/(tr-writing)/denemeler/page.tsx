import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { buildWritingSeriesJsonLd, siteName, siteUrl } from '@/lib/seo';
import { getWritingKicker, getWritingSeries } from '@/lib/writing/registry';

const series = getWritingSeries('denemeler');
const seriesJsonLd = buildWritingSeriesJsonLd(series);
const firstEssay = series.entries.at(0);

if (!firstEssay) {
  throw new Error('Denemeler series must contain at least one essay.');
}

const firstEssayHref = `/writing/${firstEssay.path.join('/')}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: series.title,
  description: series.seoDescription,
  alternates: { canonical: series.hubPath },
  openGraph: {
    title: `${series.title} — ${siteName}`,
    description: series.seoDescription,
    url: series.hubPath,
    siteName,
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${series.title} — ${siteName}`,
    description: series.seoDescription,
    creator: '@Mert_Ercan',
  },
};

export default function Denemeler() {
  return (
    <main className='min-h-screen'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesJsonLd) }} />
      <section className='writing-content container-base pt-14 pb-24 md:pt-20 md:pb-[150px]' lang='tr'>
        <div className='mb-10 md:mb-14'>
          <Link href='/writing' className='text-ink/70 hover:text-ink/85 text-sm no-underline transition-colors'>
            ← writing
          </Link>
        </div>

        <header className='max-w-[620px]'>
          <h1 className='mb-3'>{series.title}</h1>
          <div className='max-w-[58ch] space-y-5'>
            {series.description.split('\n\n').map((paragraph) => (
              <p key={paragraph} className='text-ink/70 mt-0!'>
                {paragraph}
              </p>
            ))}
          </div>
          <Link href={firstEssayHref} className='text-ink hover:text-ink/70 mt-6 inline-block text-sm no-underline'>
            İlk denemeden başla →
          </Link>
        </header>

        <section aria-label='Denemeler' className='mt-12 max-w-[620px] space-y-7 md:mt-16 md:space-y-8'>
          {series.entries.map((essay) => (
            <article key={essay.slug}>
              <p className='text-ink/70! mb-1.5 text-sm!'>
                {getWritingKicker(essay)} · <time dateTime={essay.date}>{essay.displayDate}</time>
              </p>
              <h2 className='mb-1.5! text-[1.125rem]! font-medium! md:text-[1.25rem]!'>
                <Link href={`/writing/${essay.path.join('/')}`} className='text-ink hover:text-ink/70 no-underline'>
                  {essay.title}
                </Link>
              </h2>
              <p className='text-ink/70 mt-0! text-sm!'>{essay.description}</p>
            </article>
          ))}
        </section>
      </section>
      <Footer />
    </main>
  );
}
