import { renderSocialCard } from '@/app/components/SocialCard';
import { getProjectBySlug, projects } from '@/data/projects';

type Context = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: Context): Promise<Response> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return new Response('Not found', { status: 404 });
  }

  return renderSocialCard({
    eyebrow: project.type,
    title: project.title,
  });
}
