'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  arenaReadingProgressChangeEvent,
  arenaReadingProgressStorageKey,
  readArenaReadingProgress,
  selectArenaContinuation,
  type ArenaContinuationStory,
} from '@/lib/writing/arena-reading-progress';

type Props = {
  stories: readonly ArenaContinuationStory[];
};

const labels = {
  start: 'Seriye başla',
  continue: 'Okumaya devam et',
  restart: 'Baştan oku',
} as const;

export default function ArenaContinueReading({ stories }: Props) {
  const [continuation, setContinuation] = useState(() => selectArenaContinuation(stories, new Set()));

  useEffect(() => {
    const updateProgress = () => setContinuation(selectArenaContinuation(stories, readArenaReadingProgress()));
    const updateProgressFromStorage = (event: StorageEvent) => {
      if (event.key === arenaReadingProgressStorageKey) {
        updateProgress();
      }
    };

    updateProgress();
    window.addEventListener(arenaReadingProgressChangeEvent, updateProgress);
    window.addEventListener('storage', updateProgressFromStorage);

    return () => {
      window.removeEventListener(arenaReadingProgressChangeEvent, updateProgress);
      window.removeEventListener('storage', updateProgressFromStorage);
    };
  }, [stories]);

  if (!continuation) {
    return null;
  }

  return (
    <Link href={continuation.target.href} className='text-ink hover:text-ink/70 font-medium no-underline'>
      {labels[continuation.state]} →
    </Link>
  );
}
