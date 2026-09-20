import { renderSocialCard, socialCardContentType, socialCardSize } from '@/app/components/SocialCard';

export const dynamic = 'force-static';
export const alt = 'Life — Mert Ercan';
export const size = socialCardSize;
export const contentType = socialCardContentType;

export default function LifeOpengraphImage() {
  return renderSocialCard({
    eyebrow: 'Life',
    title: 'Life',
    detail: 'A quiet record of how this site — and I — grow.',
  });
}
