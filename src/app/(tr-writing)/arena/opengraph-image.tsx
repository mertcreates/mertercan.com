import { renderSocialCard, socialCardContentType, socialCardSize } from '@/app/components/SocialCard';
import { getWritingSeries } from '@/lib/writing/registry';

const arenaSeries = getWritingSeries('arena');

export const dynamic = 'force-static';
export const alt = 'Arena — Mert Ercan';
export const size = socialCardSize;
export const contentType = socialCardContentType;

export default function ArenaOpengraphImage() {
  return renderSocialCard({
    eyebrow: 'Hikâye serisi',
    eyebrowLocale: 'tr-TR',
    title: arenaSeries.title,
    detail: arenaSeries.description,
  });
}
