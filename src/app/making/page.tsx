import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '../components/Footer';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Making — Mert Ercan',
  description: 'Things I have made — small and larger, tools and products, quiet and continuing.',
  alternates: {
    canonical: 'https://mertercan.com/making',
  },
};

const largerProjects = projects.filter((p) => p.group === 'larger');
const smallProjects = projects.filter((p) => p.group === 'small');

export default function Making() {
  return (
    <main className='min-h-screen'>
      <section className='container-base pt-14 pb-24 md:pt-20 md:pb-[150px]'>
        <div className='mb-10 md:mb-14'>
          <Link href='/' className='text-ink/40 hover:text-ink/60 text-sm no-underline transition-colors'>
            ← home
          </Link>
        </div>

        <h1 className='mb-3'>Making</h1>
        <p className='text-ink/50 mt-0! mb-16 text-sm! italic md:mb-20'>
          Things I have made — small and larger, tools and products, quiet and continuing.
        </p>

        <div className='max-w-[620px] space-y-14 md:space-y-16'>
          {/* Larger things */}
          <div>
            <div className='text-ink/35 mb-8 text-sm font-medium tracking-wide uppercase'>larger things</div>
            <div className='space-y-8 md:space-y-10'>
              {largerProjects.map((project) => (
                <div key={project.slug}>
                  <h3 className='mb-1.5'>
                    <Link href={`/making/${project.slug}`} className='text-ink hover:text-ink/70 no-underline'>
                      {project.title}
                    </Link>
                    {project.status === 'private build' && (
                      <span className='text-ink/35 ml-2 text-sm font-normal'>private</span>
                    )}
                  </h3>
                  <p className='text-ink/55 mt-0! text-sm!'>{project.context}</p>
                  <p className='text-ink/30 mt-1.5! text-xs!'>{project.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Small tools */}
          <div>
            <div className='text-ink/35 mb-8 text-sm font-medium tracking-wide uppercase'>small tools</div>
            <div className='space-y-6'>
              {smallProjects.map((project) => (
                <div key={project.slug}>
                  <h3 className='mb-1.5'>
                    <Link
                      href={`/making/${project.slug}`}
                      className='text-ink hover:text-ink/70 text-base! font-normal no-underline'
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className='text-ink/55 mt-0! text-sm!'>{project.context}</p>
                  <p className='text-ink/30 mt-1.5! text-xs!'>{project.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
