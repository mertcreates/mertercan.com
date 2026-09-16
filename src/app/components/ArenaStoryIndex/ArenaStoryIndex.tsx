import Link from 'next/link';
import type { StoryWriting } from '@/lib/writing/registry';

type Props = {
  stories: readonly StoryWriting[];
  headingLevel?: 'h2' | 'h3';
};

export default function ArenaStoryIndex({ stories, headingLevel = 'h2' }: Props) {
  const Heading = headingLevel;

  return (
    <ol className='border-ink/8 divide-ink/8 divide-y border-y'>
      {stories.map((story) => (
        <li key={story.slug}>
          <article>
            <Link
              href={`/writing/${story.path.join('/')}`}
              className='group focus-visible:outline-accent grid min-h-11 gap-1 py-4 no-underline! outline-offset-4 focus-visible:outline-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6 md:py-5'
            >
              <Heading className='group-hover:text-ink/70 group-focus-visible:text-ink/70 m-0! text-[1.125rem]! leading-snug! font-medium! tracking-tight transition-colors md:text-[1.25rem]!'>
                <span className='decoration-ink/30 underline underline-offset-2'>{story.title}</span>
              </Heading>
              <span className='text-ink/55 flex flex-wrap items-baseline gap-x-1.5 text-sm tabular-nums sm:justify-end sm:whitespace-nowrap'>
                <span>{story.position}. hikâye</span>
                <span aria-hidden='true'>·</span>
                <time dateTime={story.date}>{story.displayDate}</time>
              </span>
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
