import Footer from './components/Footer';
import Hero from './components/Hero';
import Section from './components/Section';

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Hero />

      <div className='section-divider mb-16' />

      <Section title='Who I Am'>
        <p className='text-ink/90 max-w-lg leading-[1.72]!'>
          I create with clarity, empathy, and steady curiosity. I enjoy approaching challenges through thoughtful
          thinking, simple structures, and careful iteration. Outside of work, I explore small joys like stickers,
          Spanish, leadership, baking, and psychology. I grow through gentle experimentation and the tiny worlds I
          create along the way.
        </p>
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
            <h3 className='mb-3'>Problem Solving with Empathy</h3>
            <p>
              I approach problems by understanding the people and context behind them. Good solutions come from care,
              clarity, and thoughtful consideration — not just code.
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

      <Section title='Selected Work'>
        <div className='max-w-lg space-y-8 md:space-y-10'>
          <div>
            <h3 className='mb-3'>
              <a
                href='https://bugjar.dev'
                target='_blank'
                rel='noopener noreferrer'
                className='text-ink hover:text-ink/70 no-underline'
              >
                BugJar
              </a>
            </h3>
            <p>
              A browser extension for structured session capture. It records events as they happen — deterministic,
              scope-bound, and fully under user control. Built for the moments when reproducing a bug matters more than
              guessing.
            </p>
          </div>

          <div>
            <h3 className='mb-3'>
              <a
                href='https://haklisin.app'
                target='_blank'
                rel='noopener noreferrer'
                className='text-ink hover:text-ink/70 no-underline'
              >
                Haklısın!
              </a>
            </h3>
            <p>
              A small ritual for the everyday "I told you so" moments. It turns those tiny vindications into something
              collectible — warm, playful, and surprisingly precise about the absurd business of being right.
            </p>
          </div>

          <div>
            <h3 className='mb-3'>
              <a
                href='https://kombin.dev'
                target='_blank'
                rel='noopener noreferrer'
                className='text-ink hover:text-ink/70 no-underline'
              >
                Kombin.dev
              </a>
            </h3>
            <p>
              A quiet wardrobe analysis tool. It doesn't decide what to wear — it makes the stronger options visible.
              Calm, technical, and built around the idea that good taste deserves honest feedback.
            </p>
          </div>

          <div>
            <h3 className='mb-3'>
              <a
                href='https://github.com/mertcreates/project-canon'
                target='_blank'
                rel='noopener noreferrer'
                className='text-ink hover:text-ink/70 no-underline'
              >
                Project Canon
              </a>{' '}
              <span className='text-ink/40 text-sm font-normal'>private</span>
            </h3>
            <p>
              A private studio system for character-based creative work. It holds memory, proposes ideas, turns approved
              concepts into visuals, and handles publishing — so the repetitive parts stay quiet and the judgment stays
              with me.
            </p>
          </div>

          <div>
            <h3 className='mb-3'>
              <a
                href='https://npmjs.com/package/@mertcreates/eslint-plugin-next-pages-router'
                target='_blank'
                rel='noopener noreferrer'
                className='text-ink hover:text-ink/70 no-underline'
              >
                eslint-plugin-next-pages-router
              </a>
            </h3>
            <p>Catches broken route references in Next.js Pages Router at lint time, before they reach the browser.</p>
          </div>

          <div>
            <h3 className='mb-3'>
              <a
                href='https://npmjs.com/package/@mertcreates/eslint-plugin-mv3'
                target='_blank'
                rel='noopener noreferrer'
                className='text-ink hover:text-ink/70 no-underline'
              >
                eslint-plugin-mv3
              </a>
            </h3>
            <p>
              Prevents closure traps in Manifest V3 <code>executeScript</code> calls. The kind of bug that only shows up
              at runtime — caught statically instead.
            </p>
          </div>
        </div>
      </Section>

      <div className='section-divider mb-16 md:mb-24' />

      <Section title='How I Grow' className='pb-32! md:pb-[200px]!'>
        <div className='max-w-lg space-y-4'>
          <p>
            I'm shaped by small things — the quiet moments, the subtle shifts, and the lessons that arrive slowly over
            time. I try to move in ways that feel honest, without rushing what needs space.
          </p>
          <p>
            Most of what I learn comes from staying close to the work — noticing what's breaking, what's missing, what
            could be gentler. Growth, for me, is less about milestones and more about the quality of attention.
          </p>
          <ul className='text-ink/60 list-none space-y-1.5 md:space-y-2'>
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
