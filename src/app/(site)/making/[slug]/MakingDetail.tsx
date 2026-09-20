import Image from 'next/image';
import Link from 'next/link';
import StoryText from '@/app/components/StoryText';
import type { Project } from '@/data/projects';

type Props = {
  project: Project;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export default function MakingDetail({ project }: Props) {
  return (
    <article className='container-base pt-14 pb-24 md:pt-20 md:pb-[150px]'>
      {/* Back link */}
      <div className='mb-10 md:mb-14'>
        <Link href='/making' className='text-ink/70 hover:text-ink/85 text-sm no-underline transition-colors'>
          ← making
        </Link>
      </div>

      {/* Title */}
      <h1 className='mb-3'>{project.title}</h1>

      {/* One-line context */}
      <p className='text-ink/75 mt-0! mb-2 text-base! italic'>{project.context}</p>

      {/* Metadata line */}
      <p className='text-ink/70 mt-0! mb-16 text-sm! font-medium tracking-wide md:mb-20'>
        {project.year}
        <span className='mx-2 opacity-40'>·</span>
        {project.type}
        <span className='mx-2 opacity-40'>·</span>
        {project.status}
      </p>

      <p className='text-ink/70 -mt-12! mb-16 text-sm! md:-mt-16! md:mb-20'>
        Created by{' '}
        <Link href='/' rel='author' className='text-ink/80 hover:text-ink no-underline transition-colors'>
          Mert Ercan
        </Link>
        <span className='mx-2 opacity-40' aria-hidden='true'>
          ·
        </span>
        Project updated <time dateTime={project.updatedAt}>{formatDate(project.updatedAt)}</time>
        <span className='mx-2 opacity-40' aria-hidden='true'>
          ·
        </span>
        Page reviewed <time dateTime={project.pageReviewedAt}>{formatDate(project.pageReviewedAt)}</time>
      </p>

      <StoryText paragraphs={project.story} />

      <section className='mb-14 max-w-[620px] md:mb-16' aria-labelledby='how-it-works-heading'>
        <h2 id='how-it-works-heading' className='text-ink/70 mt-0! mb-4! text-sm! font-medium tracking-wide uppercase'>
          how it works
        </h2>
        <ul className='space-y-2.5'>
          {project.howItWorks.map((line) => (
            <li key={line} className="before:text-ink/30 text-ink/70 list-none before:mr-3 before:content-['-']">
              {line}
            </li>
          ))}
        </ul>
      </section>

      {project.facts && project.facts.length > 0 && (
        <section className='mb-14 max-w-[620px] md:mb-16' aria-labelledby='project-facts-heading'>
          <h2
            id='project-facts-heading'
            className='text-ink/70 mt-0! mb-4! text-sm! font-medium tracking-wide uppercase'
          >
            project facts
          </h2>
          <ul className='space-y-2.5'>
            {project.facts.map((line) => (
              <li key={line} className="before:text-ink/30 text-ink/70 list-none before:mr-3 before:content-['-']">
                {line}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Visual frame — optional */}
      {project.visual && (
        <figure className='mb-14 max-w-[720px] md:mb-16'>
          <div className='border-ink/8 bg-ink/3 relative aspect-[16/10] w-full overflow-hidden rounded-sm border'>
            <Image
              src={project.visual.src}
              alt={project.visual.alt}
              fill
              className='object-cover object-top'
              sizes='(max-width: 768px) 100vw, 720px'
            />
          </div>
          {project.visual.caption && (
            <figcaption className='text-ink/70 mt-3 text-xs italic'>{project.visual.caption}</figcaption>
          )}
        </figure>
      )}

      {/* Official sources — optional */}
      {project.links && project.links.length > 0 && (
        <section className='mb-12 max-w-[620px] md:mb-14' aria-labelledby='official-sources-heading'>
          <h2
            id='official-sources-heading'
            className='text-ink/70 mt-0! mb-3! text-sm! font-medium tracking-wide uppercase'
          >
            official sources
          </h2>
          <ul className='space-y-2'>
            {project.links.map((link) => (
              <li key={link.href} className='list-none'>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-ink/70 hover:text-ink text-sm no-underline transition-colors'
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags — optional */}
      {project.tags && project.tags.length > 0 && (
        <div className='max-w-[620px]'>
          <ul className='flex flex-wrap gap-2'>
            {project.tags.map((tag) => (
              <li key={tag} className='list-none'>
                <span className='text-ink/70 border-ink/10 rounded-full border px-3 py-1 text-xs font-medium tracking-wide'>
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
