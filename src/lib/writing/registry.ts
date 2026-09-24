import 'server-only';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkDialogue from './remark-dialogue';

export type WritingGroup = 'denemeler' | 'siirler' | 'konusmalar' | 'hikayeler';
export type WritingFormat = 'dialogue' | 'poem' | 'article' | 'story';

type WritingSeriesDefinitionFields = Readonly<{
  slug: string;
  title: string;
  description: string;
  seoDescription: string;
  hubPath: `/${string}`;
  inLanguage: string;
}>;

const writingSeriesDefinitions = {
  arena: {
    slug: 'arena',
    title: 'Arena',
    description: 'Bir insana yeterince uzaktan bakarsan rolünü görürsün. Biraz yaklaşırsan hikâyesini.',
    seoDescription:
      "Arena, uzaktan bakınca görünen rollerin, yaklaştıkça açılan hikâyelerin izini süren Mert Ercan'ın Türkçe kısa hikâye serisi.",
    hubPath: '/arena',
    inLanguage: 'tr',
  },
  denemeler: {
    slug: 'denemeler',
    title: 'Denemeler',
    description:
      'Bu serinin ilk beş denemesini yazarlığa giriş eğitimleri sırasında karaladım: düşünce, ölüm, özgecilik, insan doğası ve dostluk. Zamanla bunlara anlaşılmak, güvenmek, sorumluluk, sağlıklı sınırlar ve öznellik üzerine dört yeni diyalog eklendi.',
    seoDescription:
      'Bu serinin ilk beş denemesini yazarlığa giriş eğitimleri sırasında karaladım: düşünce, ölüm, özgecilik, insan doğası ve dostluk. Zamanla bunlara anlaşılmak, güvenmek, sorumluluk, sağlıklı sınırlar ve öznellik üzerine dört yeni diyalog eklendi.',
    hubPath: '/writing#denemeler',
    inLanguage: 'tr',
  },
} as const satisfies Record<string, WritingSeriesDefinitionFields>;

export type WritingSeriesSlug = keyof typeof writingSeriesDefinitions;

export type WritingSeriesDefinition = (typeof writingSeriesDefinitions)[WritingSeriesSlug];

function isWritingSeriesSlug(value: string): value is WritingSeriesSlug {
  return Object.prototype.hasOwnProperty.call(writingSeriesDefinitions, value);
}

function getWritingSeriesDefinition(series: string): WritingSeriesDefinition {
  if (!isWritingSeriesSlug(series)) {
    throw new Error(`Unknown writing series: ${series}`);
  }

  const definition = writingSeriesDefinitions[series];

  if (definition.slug !== series) {
    throw new Error(`Writing series definition slug does not match its key: ${series}`);
  }

  return definition;
}

type WritingBase = {
  slug: string;
  path: string[];
  title: string;
  date: string;
  siteAddedAt: string;
  updatedAt?: string;
  displayDate: string;
  seoDescription: string;
  keywords: string[];
  kind: string;
  contentHtml: string;
};

export type DialogueWriting = WritingBase & {
  description: string;
  group: 'denemeler';
  format: 'dialogue';
  position: number;
  series?: WritingSeriesSlug;
};

export type ArticleWriting = WritingBase & {
  description: string;
  group: 'konusmalar';
  format: 'article';
  series?: never;
};

type StoryIllustration = Readonly<{
  src: string;
  alt: string;
}>;

export type StoryWriting = WritingBase & {
  group: 'hikayeler';
  format: 'story';
  position: number;
  series?: WritingSeriesSlug;
};

export type PoemWriting = WritingBase & {
  description: string;
  group: 'siirler';
  format: 'poem';
  series?: never;
};

export type WritingEntry = DialogueWriting | PoemWriting | ArticleWriting | StoryWriting;

type WritingTaxonomy = {
  label: string;
  section: string;
};

const writingTaxonomyByGroup: Record<WritingGroup, WritingTaxonomy> = {
  denemeler: { label: 'Deneme', section: 'Denemeler' },
  hikayeler: { label: 'Hikâye', section: 'Hikâyeler' },
  konusmalar: { label: 'Konuşma', section: 'Konuşmalar' },
  siirler: { label: 'Şiir', section: 'Şiirler' },
};

export function getWritingTypeLabel(writing: Pick<WritingEntry, 'group'>): string {
  return writingTaxonomyByGroup[writing.group].label;
}

export function getWritingSection(writing: Pick<WritingEntry, 'group'>): string {
  return writingTaxonomyByGroup[writing.group].section;
}

export function getWritingKicker(writing: WritingEntry): string {
  if (writing.group === 'denemeler') {
    return `${getWritingTypeLabel(writing)} · ${writing.position}`;
  }

  return getWritingTypeLabel(writing);
}

const contentDirectory = path.join(process.cwd(), 'content/writing');
const markdownProcessor = remark().use(html);
const storyMarkdownProcessor = remark().use(remarkDialogue).use(html);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type MarkdownNode = {
  type: string;
  children?: MarkdownNode[];
};

function requiredString(value: unknown, field: string, filePath: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${filePath}: ${field} must be a non-empty string.`);
  }

  return value;
}

function optionalString(value: unknown, fallback: string, field: string, filePath: string): string {
  return value === undefined ? fallback : requiredString(value, field, filePath);
}

function getWritingDescriptionMetadata(data: Record<string, unknown>, filePath: string) {
  const description = requiredString(data.description, 'description', filePath);

  return {
    description,
    seoDescription: optionalString(data.seoDescription, description, 'seoDescription', filePath),
  };
}

function getStorySeoDescription(data: Record<string, unknown>, filePath: string): string {
  if (data.description !== undefined) {
    throw new Error(`${filePath}: stories do not use a visible description; remove description.`);
  }

  return requiredString(data.seoDescription, 'seoDescription', filePath);
}

function optionalWritingSeries(value: unknown, filePath: string): WritingSeriesSlug | undefined {
  if (value === undefined) {
    return undefined;
  }

  return getWritingSeriesDefinition(requiredString(value, 'series', filePath)).slug;
}

function parseKeywords(value: unknown, filePath: string): string[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.some((keyword) => typeof keyword !== 'string' || keyword.trim().length === 0)) {
    throw new Error(`${filePath}: keywords must be a list of non-empty strings.`);
  }

  return value;
}

function requiredIsoDate(value: unknown, field: string, filePath: string): string {
  const date = requiredString(value, field, filePath);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`${filePath}: ${field} must use the YYYY-MM-DD format.`);
  }

  return date;
}

function optionalIsoDate(value: unknown, field: string, filePath: string): string | undefined {
  return value === undefined ? undefined : requiredIsoDate(value, field, filePath);
}

function requiredPositiveInteger(value: unknown, field: string, filePath: string): number {
  if (!Number.isInteger(value) || (value as number) < 1) {
    throw new Error(`${filePath}: ${field} must be a positive integer.`);
  }

  return value as number;
}

function parseStoryIllustration(value: unknown, index: number, filePath: string): StoryIllustration {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`${filePath}: illustrations[${index}] must be an object.`);
  }

  const illustration = value as Record<string, unknown>;
  const src = requiredString(illustration.src, `illustrations[${index}].src`, filePath);

  if (!src.startsWith('/illustrations/arena/') || src.split('/').includes('..')) {
    throw new Error(`${filePath}: illustrations[${index}].src must point inside /illustrations/arena/.`);
  }

  return {
    src,
    alt: requiredString(illustration.alt, `illustrations[${index}].alt`, filePath),
  };
}

function parseStoryIllustrations(
  value: unknown,
  filePath: string
): readonly [StoryIllustration, StoryIllustration] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value) || value.length !== 2) {
    throw new Error(`${filePath}: illustrations must contain exactly two entries.`);
  }

  return [parseStoryIllustration(value[0], 0, filePath), parseStoryIllustration(value[1], 1, filePath)];
}

const illustrationProgressTargets = [0.3, 0.7] as const;

function countWords(html: string): number {
  const text = html
    .replace(/<[^>]*>/gu, ' ')
    .replace(/&[^;\s]+;/gu, ' ')
    .trim();
  return text.length === 0 ? 0 : text.split(/\s+/u).length;
}

function findClosestParagraphIndex(
  progressAtParagraphEnd: readonly number[],
  target: number,
  firstAvailable: number,
  lastAvailable: number
): number {
  let selectedIndex = firstAvailable;
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (let index = firstAvailable; index <= lastAvailable; index += 1) {
    const distance = Math.abs(progressAtParagraphEnd[index] - target);

    if (distance < smallestDistance) {
      selectedIndex = index;
      smallestDistance = distance;
    }
  }

  return selectedIndex;
}

function getIllustrationParagraphNumbers(paragraphHtml: readonly string[]): readonly [number, number] {
  if (paragraphHtml.length < 3) {
    throw new Error('Arena story illustrations need at least three paragraphs.');
  }

  const wordCounts = paragraphHtml.map(countWords);
  const totalWords = wordCounts.reduce((total, count) => total + count, 0);

  if (totalWords === 0) {
    throw new Error('Arena story illustrations cannot be placed in an empty story.');
  }

  const progressAtParagraphEnd: number[] = [];
  let wordsRead = 0;

  for (const wordCount of wordCounts) {
    wordsRead += wordCount;
    progressAtParagraphEnd.push(wordsRead / totalWords);
  }

  const firstParagraphIndex = findClosestParagraphIndex(
    progressAtParagraphEnd,
    illustrationProgressTargets[0],
    0,
    paragraphHtml.length - 3
  );
  const secondParagraphIndex = findClosestParagraphIndex(
    progressAtParagraphEnd,
    illustrationProgressTargets[1],
    firstParagraphIndex + 1,
    paragraphHtml.length - 2
  );

  return [firstParagraphIndex + 1, secondParagraphIndex + 1];
}

function escapeHtmlAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function renderStoryIllustration({ src, alt }: StoryIllustration): string {
  return `<figure class="story-illustration"><img src="${escapeHtmlAttribute(src)}" alt="${escapeHtmlAttribute(alt)}" width="1000" height="1000" loading="lazy"></figure>`;
}

function addStoryIllustrations(
  contentHtml: string,
  illustrations: readonly [StoryIllustration, StoryIllustration] | undefined
): string {
  if (!illustrations) {
    return contentHtml;
  }

  // Count the same dialogue-split paragraphs that appear in the rendered story.
  const paragraphs = Array.from(contentHtml.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gu));
  const illustrationParagraphNumbers = getIllustrationParagraphNumbers(paragraphs.map((match) => match[0]));
  const htmlParts: string[] = [];
  let cursor = 0;

  for (let index = 0; index < illustrations.length; index += 1) {
    const paragraph = paragraphs[illustrationParagraphNumbers[index] - 1];
    const paragraphEnd = (paragraph.index ?? 0) + paragraph[0].length;

    htmlParts.push(contentHtml.slice(cursor, paragraphEnd));
    htmlParts.push(renderStoryIllustration(illustrations[index]));
    cursor = paragraphEnd;
  }

  htmlParts.push(contentHtml.slice(cursor));
  return htmlParts.join('');
}

function containsRawHtml(node: MarkdownNode): boolean {
  return node.type === 'html' || node.children?.some(containsRawHtml) === true;
}

function parseGroup(value: unknown, filePath: string): WritingGroup {
  if (value !== 'denemeler' && value !== 'siirler' && value !== 'konusmalar' && value !== 'hikayeler') {
    throw new Error(`${filePath}: group must be denemeler, siirler, konusmalar, or hikayeler.`);
  }

  return value;
}

function parseFormat(value: unknown, filePath: string): WritingFormat {
  if (value !== 'dialogue' && value !== 'poem' && value !== 'article' && value !== 'story') {
    throw new Error(`${filePath}: format must be dialogue, poem, article, or story.`);
  }

  return value;
}

function loadWriting(relativeFilePath: string): WritingEntry {
  const filePath = path.join(contentDirectory, relativeFilePath);
  const source = readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const publicPath = relativeFilePath.replace(/\.md$/, '').split(path.sep);
  const group = parseGroup(data.group, relativeFilePath);
  const format = parseFormat(data.format, relativeFilePath);
  const storyIllustrations =
    group === 'hikayeler' && format === 'story'
      ? parseStoryIllustrations(data.illustrations, relativeFilePath)
      : undefined;
  const processor = format === 'story' ? storyMarkdownProcessor : markdownProcessor;
  const markdownTree = processor.parse(content);

  if (publicPath.some((segment) => !slugPattern.test(segment))) {
    throw new Error(`${relativeFilePath}: path segments must use lowercase kebab-case.`);
  }

  if (containsRawHtml(markdownTree)) {
    throw new Error(`${relativeFilePath}: raw HTML is not allowed.`);
  }

  const series = optionalWritingSeries(data.series, relativeFilePath);

  const common = {
    slug: publicPath.at(-1)!,
    path: publicPath,
    title: requiredString(data.title, 'title', relativeFilePath),
    date: requiredIsoDate(data.date, 'date', relativeFilePath),
    siteAddedAt: requiredIsoDate(data.siteAddedAt, 'siteAddedAt', relativeFilePath),
    updatedAt: optionalIsoDate(data.updatedAt, 'updatedAt', relativeFilePath),
    displayDate: requiredString(data.displayDate, 'displayDate', relativeFilePath),
    keywords: parseKeywords(data.keywords, relativeFilePath),
    contentHtml: addStoryIllustrations(String(processor.processSync(content)), storyIllustrations),
  };

  if (group === 'denemeler') {
    if (format !== 'dialogue' || publicPath.length !== 2 || publicPath[0] !== 'denemeler') {
      throw new Error(`${relativeFilePath}: denemeler require a denemeler/slug path and dialogue format.`);
    }

    const position = requiredPositiveInteger(data.position, 'position', relativeFilePath);

    if (series && series !== 'denemeler') {
      throw new Error(`${relativeFilePath}: dialogue series must use the denemeler series.`);
    }

    return {
      ...common,
      ...getWritingDescriptionMetadata(data, relativeFilePath),
      group,
      format,
      kind: `${position}. deneme`,
      position,
      series,
    };
  }

  if (group === 'hikayeler') {
    if (format !== 'story' || publicPath.length !== 2 || publicPath[0] !== 'hikayeler') {
      throw new Error(`${relativeFilePath}: hikayeler require a hikayeler/slug path and story format.`);
    }

    const position = requiredPositiveInteger(data.position, 'position', relativeFilePath);

    if (series && series !== 'arena') {
      throw new Error(`${relativeFilePath}: story series must use the arena series.`);
    }

    return {
      ...common,
      seoDescription: getStorySeoDescription(data, relativeFilePath),
      group,
      format,
      kind: `${position}. hikâye`,
      position,
      series,
    };
  }

  if (group === 'siirler') {
    if (format !== 'poem' || publicPath.length !== 2 || publicPath[0] !== 'siirler') {
      throw new Error(`${relativeFilePath}: siirler require a siirler/slug path and poem format.`);
    }

    if (series) {
      throw new Error(`${relativeFilePath}: series entries require a positioned dialogue or story format.`);
    }

    return {
      ...common,
      ...getWritingDescriptionMetadata(data, relativeFilePath),
      group,
      format,
      kind: 'Şiir',
    };
  }

  if (format !== 'article' || publicPath.length !== 1) {
    throw new Error(`${relativeFilePath}: konusmalar require a flat path and article format.`);
  }

  if (series) {
    throw new Error(`${relativeFilePath}: series entries require a positioned dialogue or story format.`);
  }

  return {
    ...common,
    ...getWritingDescriptionMetadata(data, relativeFilePath),
    group,
    format,
    kind: requiredString(data.kind, 'kind', relativeFilePath),
  };
}

type PositionedWriting = DialogueWriting | StoryWriting;

function getWritingPositionScope(writing: PositionedWriting): string {
  return writing.series ? `series:${writing.series}` : `group:${writing.group}`;
}

export function validateWritingPositionScopes(entries: WritingEntry[]): void {
  const positionsByScope = new Map<string, Map<number, string>>();

  for (const entry of entries) {
    if (!('position' in entry)) {
      continue;
    }

    const writing = entry as PositionedWriting;
    const scope = getWritingPositionScope(writing);
    const positions = positionsByScope.get(scope) ?? new Map<number, string>();
    const previousPath = positions.get(writing.position);

    if (previousPath) {
      throw new Error(
        `${writing.path.join('/')}: position ${writing.position} duplicates ${previousPath} in ${scope}.`
      );
    }

    positions.set(writing.position, writing.path.join('/'));
    positionsByScope.set(scope, positions);
  }
}

function loadWritings(): WritingEntry[] {
  const markdownFiles = readdirSync(contentDirectory, { recursive: true, encoding: 'utf8' })
    .filter((filePath) => filePath.endsWith('.md'))
    .sort((first, second) => first.localeCompare(second, 'tr'));
  const entries = markdownFiles.map(loadWriting);
  const publicPaths = new Set<string>();

  for (const entry of entries) {
    const publicPath = entry.path.join('/');

    if (publicPaths.has(publicPath)) {
      throw new Error(`Duplicate writing path: ${publicPath}`);
    }

    publicPaths.add(publicPath);
  }

  validateWritingPositionScopes(entries);

  return entries;
}

type WritingSeriesEntryBySlug = {
  arena: StoryWriting & { series: 'arena' };
  denemeler: DialogueWriting & { series: 'denemeler' };
};

export type WritingSeriesEntry = WritingSeriesEntryBySlug[WritingSeriesSlug];

export type WritingSeries<Series extends WritingSeriesSlug = WritingSeriesSlug> = Readonly<
  (typeof writingSeriesDefinitions)[Series] & {
    entries: readonly WritingSeriesEntryBySlug[Series][];
  }
>;

function isWritingSeriesEntry(entry: WritingEntry): entry is WritingSeriesEntry {
  return 'position' in entry && entry.series !== undefined;
}

type WritingIndex = {
  all: WritingEntry[];
  byPath: Map<string, WritingEntry>;
  byGroup: {
    denemeler: DialogueWriting[];
    hikayeler: StoryWriting[];
    konusmalar: ArticleWriting[];
    siirler: PoemWriting[];
  };
  bySeries: Map<WritingSeriesSlug, WritingSeriesEntry[]>;
};

function comparePosition(first: { position: number }, second: { position: number }): number {
  return first.position - second.position;
}

function compareDateDescending(first: { date: string }, second: { date: string }): number {
  return second.date.localeCompare(first.date);
}

function buildWritingIndex(entries: WritingEntry[]): WritingIndex {
  const byPath = new Map<string, WritingEntry>();
  const bySeries = new Map<WritingSeriesSlug, WritingSeriesEntry[]>();
  const byGroup: WritingIndex['byGroup'] = {
    denemeler: [],
    hikayeler: [],
    konusmalar: [],
    siirler: [],
  };

  for (const entry of entries) {
    byPath.set(entry.path.join('/'), entry);

    switch (entry.group) {
      case 'denemeler':
        byGroup.denemeler.push(entry);
        break;
      case 'hikayeler':
        byGroup.hikayeler.push(entry);
        break;
      case 'konusmalar':
        byGroup.konusmalar.push(entry);
        break;
      case 'siirler':
        byGroup.siirler.push(entry);
        break;
    }

    if (isWritingSeriesEntry(entry)) {
      const seriesEntries = bySeries.get(entry.series) ?? [];

      seriesEntries.push(entry);
      bySeries.set(entry.series, seriesEntries);
    }
  }

  byGroup.denemeler.sort(comparePosition);
  byGroup.hikayeler.sort(comparePosition);
  byGroup.konusmalar.sort(compareDateDescending);
  byGroup.siirler.sort(compareDateDescending);

  for (const seriesEntries of bySeries.values()) {
    seriesEntries.sort(comparePosition);
  }

  return { all: entries, byPath, byGroup, bySeries };
}

const writingIndex = buildWritingIndex(loadWritings());

export const writings = writingIndex.all;

export function getArticleWritings(): ArticleWriting[] {
  return [...writingIndex.byGroup.konusmalar];
}

export function getStoryWritings(): StoryWriting[] {
  return [...writingIndex.byGroup.hikayeler];
}

export function getPoemWritings(): PoemWriting[] {
  return [...writingIndex.byGroup.siirler];
}

export function getWritingSeries<Series extends WritingSeriesSlug>(series: Series): WritingSeries<Series> {
  const definition = getWritingSeriesDefinition(series);
  const entries = writingIndex.bySeries.get(series) ?? [];

  return {
    ...definition,
    entries: [...entries] as WritingSeriesEntryBySlug[Series][],
  } as WritingSeries<Series>;
}

export type WritingNavigation = {
  previous?: WritingEntry;
  next?: WritingEntry;
  index?: number;
  total?: number;
  series?: Pick<WritingSeriesDefinition, 'slug' | 'title' | 'hubPath'>;
};

function getOrderedWritingNavigation(
  sequence: readonly WritingEntry[],
  writing: WritingEntry
): Omit<WritingNavigation, 'series'> | undefined {
  const index = sequence.findIndex((entry) => entry.path.join('/') === writing.path.join('/'));

  if (index === -1) {
    return undefined;
  }

  return {
    previous: sequence[index - 1],
    next: sequence[index + 1],
    index: index + 1,
    total: sequence.length,
  };
}

export function getWritingByPath(pathSegments: string[]): WritingEntry | undefined {
  return writingIndex.byPath.get(pathSegments.join('/'));
}

export function getWritingLastModified(writing: WritingEntry): string {
  return writing.updatedAt ?? writing.siteAddedAt;
}

export function getWritingNavigation(writing: WritingEntry): WritingNavigation {
  if (writing.series) {
    const series = getWritingSeries(writing.series);
    const navigation = getOrderedWritingNavigation(series.entries, writing);

    if (!navigation) {
      return {};
    }

    return {
      ...navigation,
      series: {
        slug: series.slug,
        title: series.title,
        hubPath: series.hubPath,
      },
    };
  }

  if (writing.group !== 'denemeler' && writing.group !== 'hikayeler') {
    return {};
  }

  const sequence = writing.group === 'denemeler' ? writingIndex.byGroup.denemeler : writingIndex.byGroup.hikayeler;

  return getOrderedWritingNavigation(sequence, writing) ?? {};
}
