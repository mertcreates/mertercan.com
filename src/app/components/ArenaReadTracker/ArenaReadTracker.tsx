'use client';

import { useEffect } from 'react';
import { markArenaStoryAsRead } from '@/lib/writing/arena-reading-progress';

type Props = {
  slug: string;
};

export default function ArenaReadTracker({ slug }: Props) {
  useEffect(() => {
    markArenaStoryAsRead(slug);
  }, [slug]);

  return null;
}
