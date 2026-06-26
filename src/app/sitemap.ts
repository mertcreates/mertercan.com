import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export const dynamic = 'force-static';

const metadataLastModified = '2026-06-26';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://mertercan.com',
      lastModified: metadataLastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://mertercan.com/life',
      lastModified: metadataLastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://mertercan.com/making',
      lastModified: metadataLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...projects.map((p) => ({
      url: `https://mertercan.com/making/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
