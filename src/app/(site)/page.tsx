import Link from 'next/link';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/Hero';
import Section from '@/app/components/Section';
import { getProjectBySlug } from '@/data/projects';
import { buildHomeJsonLd } from '@/lib/seo';
import { getWritingByPath, getWritingSeries } from '@/lib/writing/registry';

const jsonLd = buildHomeJsonLd();
const arenaSeries = getWritingSeries('arena');

const selectedProjects = [
  { slug: 'bugjar' },
  { slug: 'dizgi' },
  { slug: 'steam-library-manager', showYear: true },
  { slug: 'haklisin' },
  { slug: 'kombin' },
  { slug: 'project-canon' },
  { slug: 'eslint-next-pages-router' },
].map((selection) => {
  const project = getProjectBySlug(selection.slug);

  if (!project) {
    throw new Error(`Selected project not found: ${selection.slug}`);
  }

  return { project, showYear: selection.showYear ?? false };
});

const selectedWritings = [
  ['siirler', 'tedbir'],
  ['denemeler', 'sorumluluk'],
  ['denemeler', 'saglikli-sinirlar'],
  ['denemeler', 'oznellik'],
].map((pathSegments) => {
  const writing = getWritingByPath(pathSegments);

  if (!writing) {
    throw new Error(`Selected writing not found: ${pathSegments.join('/')}`);
  }

  return writing;
});

export default function Home() {
  return (
    <main className='min-h-screen'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />

      <div className='section-divider mb-16' />

      <Section title='Who I Am'>
        <div className='text-ink/90 max-w-lg space-y-4 leading-[1.72]!'>
          <p>
            I tend to stay with things long enough to understand what really matters. I pay attention to how people
            think, where small frictions keep repeating, and what makes something feel trustworthy rather than merely
            functional.
          </p>
          <p>
            When I care about something, I usually give it a structure — a tool, a ritual, a system, or a small world
            that can keep growing without losing what made it meaningful.
          </p>
        </div>
      </Section>

      <div className='section-divider mb-16 md:mb-24' />

      <Section title='What I Make'>
        <div className='max-w-lg space-y-6'>
          <div>
            <h3 className='mb-3'>Frontends with clarity</h3>
            <p>
              I create frontends with clear structures and readable logic. I care about making things work in ways that
              feel intuitive, stable, and free of unnecessary complexity.
            </p>
          </div>

          <div>
            <h3 className='mb-3'>Systems that begin with people</h3>
            <p>
              Many of the things I make begin with something small and specific: a friend&apos;s repeated workaround, a
              QA message, an inside joke, or a routine worth keeping. I pay attention to what keeps repeating, then
              build the smallest structure that helps it work better, last longer, or stay visible.
            </p>
          </div>

          <div>
            <h3 className='mb-3'>Tiny Creative Worlds</h3>
            <p>
              Some things begin as quiet gestures — a small character, a recurring shape, a feeling that needs a form. I
              let them grow slowly, without forcing a destination. The continuity matters more than the output.
            </p>
          </div>
        </div>
      </Section>

      <div className='section-divider mb-16 md:mb-24' />

      <Section title='Selected Writing'>
        <div className='max-w-lg space-y-10 md:space-y-12' lang='tr'>
          <section aria-labelledby='selected-stories-heading'>
            <h3
              id='selected-stories-heading'
              className='text-ink/70 mb-5 text-sm! font-medium tracking-wide uppercase md:mb-6'
            >
              Hikâyeler
            </h3>
            <article>
              <h4 className='text-ink mb-1.5 text-[1.125rem] leading-snug font-medium tracking-tight md:text-[1.25rem]'>
                <Link href={arenaSeries.hubPath} className='text-ink hover:text-ink/70 no-underline'>
                  {arenaSeries.title}
                </Link>
              </h4>
              <p className='text-ink/70 mt-0! text-sm!'>{arenaSeries.description}</p>
            </article>
          </section>

          <section aria-labelledby='selected-poems-heading'>
            <h3
              id='selected-poems-heading'
              className='text-ink/70 mb-5 text-sm! font-medium tracking-wide uppercase md:mb-6'
            >
              Şiirler
            </h3>
            {selectedWritings
              .filter((writing) => writing.group === 'siirler')
              .map((writing) => (
                <article key={writing.slug}>
                  <h4 className='text-ink mb-1.5 text-[1.125rem] leading-snug font-medium tracking-tight md:text-[1.25rem]'>
                    <Link
                      href={`/writing/${writing.path.join('/')}`}
                      className='text-ink hover:text-ink/70 no-underline'
                    >
                      {writing.title}
                    </Link>
                  </h4>
                  <p className='text-ink/70 mt-0! text-sm!'>{writing.description}</p>
                </article>
              ))}
          </section>

          <section aria-labelledby='selected-essays-heading'>
            <h3
              id='selected-essays-heading'
              className='text-ink/70 mb-5 text-sm! font-medium tracking-wide uppercase md:mb-6'
            >
              Denemeler
            </h3>
            <div className='space-y-7 md:space-y-8'>
              {selectedWritings
                .filter((writing) => writing.group === 'denemeler')
                .map((writing) => (
                  <article key={writing.slug}>
                    <h4 className='text-ink mb-1.5 text-[1.125rem] leading-snug font-medium tracking-tight md:text-[1.25rem]'>
                      <Link
                        href={`/writing/${writing.path.join('/')}`}
                        className='text-ink hover:text-ink/70 no-underline'
                      >
                        {writing.title}
                      </Link>
                    </h4>
                    <p className='text-ink/70 mt-0! text-sm!'>{writing.description}</p>
                  </article>
                ))}
            </div>
          </section>
        </div>
        <Link
          href='/writing'
          className='text-ink/70 hover:text-ink/90 decoration-ink/40 mt-8 inline-block text-sm underline underline-offset-2 transition-colors'
        >
          all writing →
        </Link>
      </Section>

      <div className='section-divider mb-16 md:mb-24' />

      <Section title='Selected Work'>
        <div className='max-w-lg space-y-8 md:space-y-10'>
          {selectedProjects.map(({ project, showYear }) => (
            <div key={project.slug}>
              <h3 className={`mb-3 flex items-center gap-2${showYear ? ' flex-wrap' : ''}`}>
                <Link href={`/making/${project.slug}`} className='text-ink hover:text-ink/70 no-underline'>
                  {project.title}
                </Link>
                {showYear && <span className='text-ink/70 text-sm font-normal'>{project.year}</span>}
                {project.status === 'private build' && <span className='text-ink/70 text-sm font-normal'>private</span>}
              </h3>
              <p>{project.homeSummary ?? project.context}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className='section-divider mb-16 md:mb-24' />

      <Section title='How I Grow' className='pb-32! md:pb-[200px]!'>
        <div className='max-w-lg space-y-4'>
          <p>
            I&apos;m shaped by small things — the quiet moments, the subtle shifts, and the lessons that arrive slowly
            over time. I try to move in ways that feel honest, without rushing what needs space.
          </p>
          <p>
            Most of what I learn comes from staying close to the work — noticing what&apos;s breaking, what&apos;s
            missing, what could be gentler. Growth, for me, is less about milestones and more about the quality of
            attention.
          </p>
          <ul className='text-ink/75 list-none space-y-1.5 md:space-y-2'>
            <li className="before:text-ink/50 before:mr-3 before:content-['-']">I grow where I care</li>
            <li className="before:text-ink/50 before:mr-3 before:content-['-']">paying attention, softly</li>
            <li className="before:text-ink/50 before:mr-3 before:content-['-']">staying long enough to understand</li>
          </ul>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
