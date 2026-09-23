'use client';

import { useEffect, useRef } from 'react';
import { markArenaStoryAsRead } from '@/lib/writing/arena-reading-progress';

type Props = {
  slug: string;
};

export default function ArenaReadTracker({ slug }: Props) {
  const endMarkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const endMarker = endMarkerRef.current;

    if (!endMarker) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        markArenaStoryAsRead(slug);
        observer.disconnect();
      }
    });

    observer.observe(endMarker);

    return () => observer.disconnect();
  }, [slug]);

  return <div ref={endMarkerRef} aria-hidden='true' className='h-px' />;
}
