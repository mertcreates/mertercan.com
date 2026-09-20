import { renderSocialCard, type SocialCardModel } from '@/app/components/SocialCard';
import { getWritingByPath, getWritingTypeLabel, type WritingEntry, writings } from '@/lib/writing/registry';

type Context = {
  params: Promise<{ slug: string[] }>;
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return writings.map((writing) => ({ slug: writing.path }));
}

function getWritingCardModel(writing: WritingEntry): SocialCardModel {
  if (writing.format === 'story') {
    return {
      eyebrow: `Arena · ${writing.position}. hikâye`,
      eyebrowLocale: 'tr-TR',
      title: writing.title,
      detail: writing.displayDate,
    };
  }

  if (writing.group === 'denemeler') {
    return {
      eyebrow: `Deneme · ${writing.position}`,
      eyebrowLocale: 'tr-TR',
      title: writing.title,
      detail: writing.displayDate,
    };
  }

  return {
    eyebrow: getWritingTypeLabel(writing),
    eyebrowLocale: 'tr-TR',
    title: writing.title,
    detail: writing.displayDate,
  };
}

export async function GET(_request: Request, { params }: Context): Promise<Response> {
  const { slug } = await params;
  const writing = getWritingByPath(slug);

  if (!writing) {
    return new Response('Not found', { status: 404 });
  }

  return renderSocialCard(getWritingCardModel(writing));
}
