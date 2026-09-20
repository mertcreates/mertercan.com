import { getWritingEntryUrl, siteName, siteUrl } from '@/lib/seo';
import { buildArenaFeed } from '@/lib/writing/arena-feed';
import { getWritingSeries } from '@/lib/writing/registry';

export const dynamic = 'force-static';

const arenaSeries = getWritingSeries('arena');
const feedUrl = `${siteUrl}${arenaSeries.hubPath}/feed.xml`;

export function GET(): Response {
  const feed = buildArenaFeed({
    siteName,
    series: {
      title: arenaSeries.title,
      description: arenaSeries.seoDescription,
      languageTag: 'tr-TR',
      hubUrl: `${siteUrl}${arenaSeries.hubPath}`,
      feedUrl,
    },
    stories: arenaSeries.entries.map((story) => ({
      title: story.title,
      description: story.seoDescription,
      url: getWritingEntryUrl(story),
      siteAddedAt: story.siteAddedAt,
      updatedAt: story.updatedAt,
    })),
  });

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
