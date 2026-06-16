import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Footer from '@/app/components/Footer';
import { projects, getProjectBySlug } from '@/data/projects';
import MakingDetail from './MakingDetail';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Not Found — Mert Ercan' };
  }

  return {
    title: `${project.title} — Mert Ercan`,
    description: project.context,
    alternates: {
      canonical: `https://mertercan.com/making/${project.slug}`,
    },
  };
}

export default async function MakingPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className='min-h-screen'>
      <MakingDetail project={project} />
      <Footer />
    </main>
  );
}
