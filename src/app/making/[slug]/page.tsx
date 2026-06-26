import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Footer from '@/app/components/Footer';
import { projects, getProjectBySlug } from '@/data/projects';
import MakingDetail from './MakingDetail';

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Not Found' };
  }

  return {
    title: project.title,
    description: project.context,
    alternates: {
      canonical: `/making/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Mert Ercan`,
      description: project.context,
      url: `/making/${project.slug}`,
      siteName: 'Mert Ercan',
      type: 'website',
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
      title: `${project.title} — Mert Ercan`,
      description: project.context,
      images: ['/opengraph-image'],
    },
  };
}

export default async function MakingPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mertercan.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Making',
        item: 'https://mertercan.com/making',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://mertercan.com/making/${project.slug}`,
      },
    ],
  };

  return (
    <main className='min-h-screen'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <MakingDetail project={project} />
      <Footer />
    </main>
  );
}
