import { renderSocialCard, socialCardContentType, socialCardSize } from '@/app/components/SocialCard';
import { getWritingSeries } from '@/lib/writing/registry';

const series = getWritingSeries('denemeler');

export const dynamic = 'force-static';
export const alt = 'Denemeler — Mert Ercan';
export const size = socialCardSize;
export const contentType = socialCardContentType;

export default function DenemelerOpengraphImage() {
  return renderSocialCard({
    eyebrow: 'Deneme serisi',
    eyebrowLocale: 'tr-TR',
    title: series.title,
    detail: series.description,
  });
}
