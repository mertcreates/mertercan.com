import type { StoryWriting } from '@/lib/writing/registry';
import ArenaStoryList from './ArenaStoryList';

type Props = {
  stories: readonly StoryWriting[];
  headingLevel?: 'h2' | 'h3';
};

export default function ArenaStoryIndex({ stories, headingLevel = 'h2' }: Props) {
  const storyListItems = stories.map((story) => ({
    slug: story.slug,
    href: `/writing/${story.path.join('/')}`,
    title: story.title,
    position: story.position,
    date: story.date,
    displayDate: story.displayDate,
  }));

  return <ArenaStoryList stories={storyListItems} headingLevel={headingLevel} />;
}
