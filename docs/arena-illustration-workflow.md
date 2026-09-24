# Arena Story Illustration Workflow

Use this guide whenever adding or revising illustrations for an Arena story. The artwork should extend the story's own atmosphere and scene progression; it is not a cover, summary, or substitute for the prose.

## Fixed standard

- Add exactly two story-specific illustrations, in reading order.
- Story HTML generation targets 30% and 70% of the rendered text, then places images after the nearest distinct paragraph ends. Leave at least one paragraph between images and one after the second. Dialogue-split paragraphs count because placement uses rendered HTML.
- The image must depict an event the reader has already reached at its insertion point. Do not show later actions, revelations, or endings early.
- Make the two images visually distinct in action and composition. The second image may illustrate a nearby earlier beat if that creates a clearer pair; it must still be an event the reader has already read at that position.
- Keep the illustrations inline, centered, and visually secondary to the prose. Their generated `<figure>` caps them at 480px and uses native `loading="lazy"`.
- Put image metadata in the story's frontmatter as an `illustrations` list with exactly two `{ src, alt }` entries. Store assets under `public/illustrations/arena/` and use root-relative `/illustrations/arena/...` paths.

The implementation is authoritative for placement and rendering: `src/lib/writing/registry.ts` and `src/app/globals.css`. The writing page renders the generated story HTML through its normal content path.

## Art direction

Make original, light, poetic storybook illustrations with a hand-painted watercolor/gouache feel, restrained slate-blue and ochre colors, and soft grain. Derive the subject, mood, and props from the particular story's theme and events. Use existing Arena illustrations as style references; use the first image of a story as a character reference for its second image. Preserve recurring character details between the pair. For the established look and edge treatment, start with `public/illustrations/arena/arena-i-gladyator-rising-knee.webp` and `public/illustrations/arena/arena-i-gladyator-shadow-rival-transparent.webp`.

The page background is `#faf7f2`. Give every illustration a genuinely transparent alpha perimeter with an irregular, gradual watercolor fade. Keep the scene's sky, setting, and meaningful details visible inside the art. Do not leave an opaque off-white matte, rectangular canvas, border, card, drop shadow, or painted checkerboard.

Describe poses concretely when they matter to the prose: say which knee touches the ground, which foot is planted, and what supports the character. Review that detail at the final display size; a generic word such as “kneeling” may produce the wrong posture.

## Runbook

1. Read the whole story and count the rendered paragraphs and words. Identify the paragraph boundaries nearest 30% and 70% of story text.
2. Choose one distinct scene for each point. Describe only facts revealed by that point; keep the final paragraph or reveal unobstructed when possible. Avoid repeating the same tableau in both images.
3. Generate two separate images with the built-in image-generation tool. Use one prompt per scene. Reference an existing Arena image for style; reference the first new image when generating the second if the same character appears.
4. Inspect both outputs for story accuracy, character continuity, legible composition at 480px, and real transparency. Check the four corners for zero alpha; allow at most a 1/255 antialiasing residue after WebP encoding. Refine any image with an opaque matte or hard edge before adding it.
5. Export each accepted image as a 1000×1000 WebP while preserving alpha. Add exactly two `src`/`alt` entries to that story's frontmatter. Write concise alt text for visible content only; do not add captions or new story prose.
6. Run targeted lint/type checks and `npm run build`. Inspect the generated story HTML: exactly two figures, after the intended rendered paragraphs, with non-empty alt text and `loading="lazy"`. Open the page and confirm the edges blend into the page and no image spoils a later event.

## Prompt template

```text
Use case: illustration-story
Asset type: inline narrative illustration for Arena [Roman numeral] on mertercan.com
Input images: Image 1 is a style reference; Image 2, when supplied, is the recurring-character reference.
Primary request: depict only this already-read story beat: [concrete scene, characters, action, and mood].
Composition: square, readable at 480px, preserve room around the focal action.
Style/medium: original light storybook watercolor/gouache, restrained slate-blue and ochre palette, soft painted grain.
Page integration: preserve the full scene; taper the painted perimeter through an irregular watercolor fade to genuine alpha transparency on every edge and corner.
Constraints: preserve established character details; do not depict events beyond this beat; no opaque matte, hard canvas edge, frame, card, shadow, text, or watermark.
```

## Arena I reference

Arena I uses the same two-point standard: the first scene follows paragraph 2 (about 30%) and shows the exhausted gladyatör with one knee down, the other foot planted, facing indistinct rivals; the second follows paragraph 5 (about 77%) and shows a rival dissolving into a dark spirit. The blank king's place and awakening are excluded from both images because they occur later.

Use these as scene prompts, then append the shared style, transparent-edge, and constraint lines from the template:

1. `After paragraph 2: An exhausted, dark-haired gladiator braces himself on his sword under salty rain. One knee is on the sand and the other boot is planted as he faces several opponents whose faces blur; the arena floor subtly seems to shift.`
2. `After paragraph 5: The same gladiator strikes the nearest faceless opponent. The opponent dissolves into a dark, smoke-like spirit and disappears; a few indistinct rivals remain in the arena.`

## Arena XXXII reference

Arena XXXII has 280 words in 45 rendered paragraphs after dialogue splitting. The 30% target lands after paragraph 13 (30.0%): the child looks down at the pencils arranged on the desk while the teacher observes. The 70% target snaps after paragraph 32 (69.3%). To keep the pair visually distinct, the second image uses the already-read pencil-case challenge from paragraph 25: the child balances three cases toward the cupboard while the teacher watches from farther away. The child's next remark begins in paragraph 33, so keep it out of the second image.

Scene prompts used:

1. `After rendered paragraph 13: A woman teacher quietly watches a gender-neutral school-age child look down at several pencils carefully arranged in a row on the front-row desk. Other pupils and the classroom board remain soft in the background.`
2. `For the second image, use the just-read action from paragraph 25: the same child carries a stack of three pencil cases toward the classroom cupboard; one starts to slide and the child steadies it with an elbow. The same teacher watches from farther away. Use a wider classroom view so the pair does not repeat the close desk-and-pencil composition.`
