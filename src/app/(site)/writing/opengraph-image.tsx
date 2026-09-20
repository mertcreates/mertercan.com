import { renderSocialCard, socialCardContentType, socialCardSize } from '@/app/components/SocialCard';

export const dynamic = 'force-static';
export const alt = 'Writing — Mert Ercan';
export const size = socialCardSize;
export const contentType = socialCardContentType;

export default function WritingOpengraphImage() {
  return renderSocialCard({
    eyebrow: 'Writing',
    title: 'Writing',
    detail: 'Notes, poems, essays, stories, and small conversations I want to keep somewhere quieter than the feed.',
  });
}
