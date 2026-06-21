import type { ReactNode } from 'react';

type StoryTextProps = {
  paragraphs: string[];
};

const inlineCodePattern = /`([^`]+)`/g;

function renderTextSegments(text: string): ReactNode[] {
  const segments: ReactNode[] = [];
  let textStart = 0;

  for (const match of text.matchAll(inlineCodePattern)) {
    const matchStart = match.index ?? 0;
    const [rawMatch, codeText] = match;

    if (matchStart > textStart) {
      segments.push(text.slice(textStart, matchStart));
    }

    segments.push(
      <code
        key={`${matchStart}-${codeText}`}
        className='text-ink/80 border-ink/10 bg-ink/4 rounded-sm border px-1 py-0.5 font-mono text-[0.92em]'
      >
        {codeText}
      </code>,
    );

    textStart = matchStart + rawMatch.length;
  }

  if (textStart < text.length) {
    segments.push(text.slice(textStart));
  }

  return segments;
}

export default function StoryText({ paragraphs }: StoryTextProps) {
  return (
    <div className='mb-14 max-w-[620px] space-y-5 md:mb-16'>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className='text-ink/85'>
          {renderTextSegments(paragraph)}
        </p>
      ))}
    </div>
  );
}
