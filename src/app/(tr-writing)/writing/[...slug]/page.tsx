import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import ArenaReadTracker from '@/app/components/ArenaReadTracker';
import Footer from '@/app/components/Footer';
import WritingShare from '@/app/components/WritingShare';
import {
  buildWritingEntryJsonLd,
  getWritingEntryUrl,
  getWritingMetadataTitle,
  getWritingSeoDescription,
  siteName,
  siteUrl,
} from '@/lib/seo';
import {
  getWritingByPath,
  getWritingKicker,
  getWritingNavigation,
  getWritingSection,
  writings,
} from '@/lib/writing/registry';
import { buildWritingShareLinks } from '@/lib/writing/share';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const writingBodyClassNames = {
  dialogue: 'essay-dialogue',
  poem: 'writing-poem',
  article: 'writing-prose',
  story: 'writing-story',
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return writings.map((writing) => ({ slug: writing.path }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWritingByPath(slug);

  if (!writing) {
    return { metadataBase: new URL(siteUrl), title: 'Not Found' };
  }

  const description = getWritingSeoDescription(writing);
  const title = getWritingMetadataTitle(writing);
  const writingUrl = getWritingEntryUrl(writing);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: writingUrl,
    },
    openGraph: {
      title: `${title} — ${siteName}`,
      description,
      url: writingUrl,
      siteName,
      locale: 'tr_TR',
      type: 'article',
      section: getWritingSection(writing),
      publishedTime: writing.siteAddedAt,
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
      title: `${title} — ${siteName}`,
      description,
      creator: '@Mert_Ercan',
      images: ['/opengraph-image'],
    },
  };
}

export default async function WritingEntryPage({ params }: Props) {
  const { slug } = await params;
  const writing = getWritingByPath(slug);

  if (!writing) {
    notFound();
  }

  const writingJsonLd = buildWritingEntryJsonLd(writing);
  const writingUrl = getWritingEntryUrl(writing);
  const navigation = getWritingNavigation(writing);
  const isSeriesEntry = Boolean(writing.series);
  const isStory = writing.format === 'story';
  const backLink =
    isStory && navigation.series
      ? { href: navigation.series.hubPath, label: `← ${navigation.series.title}` }
      : { href: '/writing', label: '← writing' };
  const writingShareSeries =
    'position' in writing && writing.series ? { slug: writing.series, position: writing.position } : undefined;
  const writingShareLinks = buildWritingShareLinks({
    canonicalUrl: writingUrl,
    title: writing.title,
    slug: writing.slug,
    series: writingShareSeries,
  });

  return (
    <main className='min-h-screen'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(writingJsonLd) }} />
      <article className='container-base pt-14 pb-24 md:pt-20 md:pb-[150px]'>
        <div data-nosnippet='' className='mb-10 md:mb-14'>
          <Link href={backLink.href} className='text-ink/70 hover:text-ink/85 text-sm no-underline transition-colors'>
            {backLink.label}
          </Link>
        </div>

        {isStory && navigation.series ? (
          <p className='text-ink/70 mb-3 text-sm! tabular-nums'>
            {navigation.series.title} serisi · {writing.position}/{navigation.total} ·{' '}
            <time dateTime={writing.date}>{writing.displayDate}</time>
          </p>
        ) : (
          <p className='text-ink/70 mb-3 text-sm!'>
            {getWritingKicker(writing)} · <time dateTime={writing.date}>{writing.displayDate}</time>
          </p>
        )}
        <h1 className='mb-4 max-w-[680px] text-[2.2rem]! md:text-[3.1rem]!'>{writing.title}</h1>
        {writing.format !== 'story' && (
          <p className='text-ink/70 mt-0! max-w-[620px] text-sm! italic'>{writing.description}</p>
        )}

        <div
          data-nosnippet={writing.format === 'story' ? '' : undefined}
          className={writingBodyClassNames[writing.format]}
          dangerouslySetInnerHTML={{ __html: writing.contentHtml }}
        />

        {isStory && <ArenaReadTracker slug={writing.slug} />}

        {isSeriesEntry
          ? navigation.series &&
            (isStory ? (
              <div data-nosnippet=''>
                <nav
                  aria-label={`${navigation.series.title} serisi`}
                  className='border-ink/8 max-w-[640px] border-t pt-8'
                >
                  <div className='grid gap-3 sm:grid-cols-2'>
                    {navigation.previous && (
                      <Link
                        href={`/writing/${navigation.previous.path.join('/')}`}
                        className='border-ink/10 text-ink/70 hover:border-ink/25 hover:text-ink focus-visible:outline-accent flex min-h-24 flex-col justify-between gap-3 border p-4 no-underline! transition-colors outline-offset-4 focus-visible:outline-2'
                      >
                        <span className='text-sm'>Önceki hikâye</span>
                        <span className='text-ink font-medium'>← {navigation.previous.title}</span>
                        <span className='text-sm tabular-nums'>
                          {writing.position - 1}/{navigation.total}
                        </span>
                      </Link>
                    )}
                    {navigation.next && (
                      <Link
                        href={`/writing/${navigation.next.path.join('/')}`}
                        className='border-ink/15 text-ink hover:border-ink/30 focus-visible:outline-accent flex min-h-24 flex-col justify-between gap-3 border p-4 no-underline! transition-colors outline-offset-4 focus-visible:outline-2 sm:col-start-2 sm:items-end sm:text-right'
                      >
                        <span className='text-ink/70 text-sm'>Sonraki hikâye</span>
                        <span className='font-medium'>{navigation.next.title} →</span>
                        <span className='text-ink/70 text-sm tabular-nums'>
                          {writing.position + 1}/{navigation.total}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className='mt-5'>
                    <Link
                      href={navigation.series.hubPath}
                      className='text-ink/70 hover:text-ink text-sm no-underline transition-colors'
                    >
                      Tüm {navigation.series.title} hikâyeleri
                    </Link>
                  </div>
                </nav>
              </div>
            ) : (
              <div data-nosnippet=''>
                <nav
                  aria-label={`${navigation.series.title} serisi`}
                  className='border-ink/8 grid max-w-[680px] gap-y-5 border-t pt-8 leading-5 md:grid-cols-[1fr_auto_1fr] md:gap-x-8 md:gap-y-3'
                >
                  {navigation.previous && (
                    <div className='order-2 md:order-none md:col-start-1 md:row-start-1'>
                      <Link
                        href={`/writing/${navigation.previous.path.join('/')}`}
                        className='text-ink/70 hover:text-ink text-sm no-underline transition-colors'
                      >
                        ← {navigation.previous.title}
                      </Link>
                    </div>
                  )}
                  <p className='text-ink/70 order-1 mb-0 text-sm! leading-5! md:order-none md:col-start-2 md:row-start-1 md:text-center'>
                    {navigation.series.title} serisi · {navigation.index}/{navigation.total}
                  </p>
                  {navigation.next && (
                    <div className='order-3 md:col-start-3 md:row-start-1 md:text-right'>
                      <Link
                        href={`/writing/${navigation.next.path.join('/')}`}
                        className='text-ink/70 hover:text-ink text-sm no-underline transition-colors'
                      >
                        {navigation.next.title} →
                      </Link>
                    </div>
                  )}
                  <div className='order-4 md:col-span-3 md:row-start-2 md:text-center'>
                    <Link
                      href={navigation.series.hubPath}
                      className='text-ink/70 hover:text-ink text-sm no-underline transition-colors'
                    >
                      Tüm {navigation.series.title} serisi
                    </Link>
                  </div>
                </nav>
              </div>
            ))
          : writing.group === 'denemeler' &&
            (navigation.previous || navigation.next) && (
              <div data-nosnippet=''>
                <nav className='border-ink/8 flex max-w-[680px] flex-col gap-5 border-t pt-8 md:flex-row md:items-start md:justify-between'>
                  <div>
                    {navigation.previous && (
                      <Link
                        href={`/writing/${navigation.previous.path.join('/')}`}
                        className='text-ink/70 hover:text-ink text-sm no-underline transition-colors'
                      >
                        ← {navigation.previous.title}
                      </Link>
                    )}
                  </div>
                  <div className='md:text-right'>
                    {navigation.next && (
                      <Link
                        href={`/writing/${navigation.next.path.join('/')}`}
                        className='text-ink/70 hover:text-ink text-sm no-underline transition-colors'
                      >
                        {navigation.next.title} →
                      </Link>
                    )}
                  </div>
                </nav>
              </div>
            )}

        <div data-nosnippet='' className='mt-6 flex max-w-[680px] justify-start md:mt-8 md:justify-end'>
          <WritingShare title={writing.title} links={writingShareLinks} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
