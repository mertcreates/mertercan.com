type ArenaFeedSeries = {
  title: string;
  description: string;
  languageTag: string;
  hubUrl: string;
  feedUrl: string;
};

type ArenaFeedStory = {
  title: string;
  description: string;
  url: string;
  siteAddedAt: string;
  updatedAt?: string;
};

type BuildArenaFeedOptions = {
  series: ArenaFeedSeries;
  stories: readonly ArenaFeedStory[];
  siteName: string;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRfc822Date(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function buildArenaFeed({ series, stories, siteName }: BuildArenaFeedOptions): string {
  const latestLastModified = stories
    .map((story) => story.updatedAt ?? story.siteAddedAt)
    .sort()
    .at(-1);
  const lastBuildDate = latestLastModified
    ? `<lastBuildDate>${escapeXml(toRfc822Date(latestLastModified))}</lastBuildDate>`
    : '';
  const items = [...stories]
    .reverse()
    .map(
      (story) => `<item>
        <title>${escapeXml(story.title)}</title>
        <link>${escapeXml(story.url)}</link>
        <guid isPermaLink="true">${escapeXml(story.url)}</guid>
        <description>${escapeXml(story.description)}</description>
        <pubDate>${escapeXml(toRfc822Date(story.siteAddedAt))}</pubDate>
      </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(series.title)} — ${escapeXml(siteName)}</title>
    <link>${escapeXml(series.hubUrl)}</link>
    <atom:link href="${escapeXml(series.feedUrl)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(series.description)}</description>
    <language>${escapeXml(series.languageTag)}</language>
    ${lastBuildDate}
    ${items}
  </channel>
</rss>
`;
}
