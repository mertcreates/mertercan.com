const arenaReadingProgressVersion = 1;

export const arenaReadingProgressStorageKey = 'arena-reading-progress';
export const arenaReadingProgressChangeEvent = 'arena-reading-progress-change';

type ArenaReadingProgress = {
  version: typeof arenaReadingProgressVersion;
  readStorySlugs: string[];
};

export function parseArenaReadingProgress(value: string | null): Set<string> {
  if (!value) {
    return new Set();
  }

  try {
    const parsed = JSON.parse(value) as Partial<ArenaReadingProgress>;

    if (parsed.version !== arenaReadingProgressVersion || !Array.isArray(parsed.readStorySlugs)) {
      return new Set();
    }

    return new Set(parsed.readStorySlugs.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0));
  } catch {
    return new Set();
  }
}

export function readArenaReadingProgress(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }

  try {
    return parseArenaReadingProgress(window.localStorage.getItem(arenaReadingProgressStorageKey));
  } catch {
    return new Set();
  }
}

export function markArenaStoryAsRead(slug: string): void {
  const readStorySlugs = readArenaReadingProgress();

  if (readStorySlugs.has(slug)) {
    return;
  }

  readStorySlugs.add(slug);

  const progress: ArenaReadingProgress = {
    version: arenaReadingProgressVersion,
    readStorySlugs: [...readStorySlugs],
  };

  try {
    window.localStorage.setItem(arenaReadingProgressStorageKey, JSON.stringify(progress));
    window.dispatchEvent(new Event(arenaReadingProgressChangeEvent));
  } catch {
    // Reading progress is an optional local enhancement; the story remains usable without storage access.
  }
}
