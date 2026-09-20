import { renderSocialCard, socialCardContentType, socialCardSize } from '@/app/components/SocialCard';

export const dynamic = 'force-static';
export const alt = 'Making — projects by Mert Ercan';
export const size = socialCardSize;
export const contentType = socialCardContentType;

export default function MakingOpengraphImage() {
  return renderSocialCard({
    eyebrow: 'Selected work',
    title: 'Making',
    detail: 'Things I have made — small and larger, tools and products, quiet and continuing.',
  });
}
