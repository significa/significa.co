import { VIDEO_EXTENSIONS } from '../constants';
import type { AssetStoryblok, RichtextStoryblok } from '$types/bloks';

/** Storyblok asset URLs carry the original dimensions: /f/<space>/<w>x<h>/<hash>/<name> */
const STORYBLOK_DIMENSIONS = /\/f\/\d+\/(\d+)x(\d+)\//;

export type ImageInput = {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
  /** Storyblok focal point ("x1xy1:x2xy2"), used for crops. */
  focus?: string;
};

/** Converts a Storyblok asset into image data. Returns undefined for empty assets and videos. */
export function imageFromAsset(
  asset:
    | (Pick<AssetStoryblok, 'filename'> & { alt?: string | null; focus?: string | null })
    | undefined
    | null
): ImageInput | undefined {
  if (!asset?.filename) return undefined;

  const extension = asset.filename.split('.').pop()?.toLowerCase() ?? '';
  if (VIDEO_EXTENSIONS.includes(extension)) return undefined;

  const match = asset.filename.match(STORYBLOK_DIMENSIONS);
  const width = match ? Number(match[1]) : undefined;
  const height = match ? Number(match[2]) : undefined;

  return {
    url: asset.filename.replace(/^http:\/\//, 'https://'),
    width: width && width > 0 ? width : undefined,
    height: height && height > 0 ? height : undefined,
    caption: asset.alt?.trim() || undefined,
    focus: asset.focus?.trim() || undefined
  };
}

/**
 * Storyblok image service crop of an asset, centred on its focal point (or
 * smart-cropped). Only for Storyblok assets at least as large as the crop.
 */
export function storyblokCrop(
  image: ImageInput,
  width: number,
  height: number
): string | undefined {
  if (!STORYBLOK_DIMENSIONS.test(image.url)) return undefined;
  if (!image.width || !image.height || image.width < width || image.height < height) {
    return undefined;
  }
  const filter = image.focus ? `filters:focal(${image.focus})` : 'smart';
  return `${image.url}/m/${width}x${height}/${filter}`;
}

/** Number of words in a text. */
export const countWords = (text: string): number => text.split(/\s+/).filter(Boolean).length;

/**
 * ImageObject node. Typed locally because schema-dts models width/height as
 * Distance | QuantitativeValue, while search engines expect plain pixel numbers.
 */
export type ImageObjectNode = {
  '@type': 'ImageObject';
  '@id'?: string;
  url: string;
  contentUrl: string;
  width?: number;
  height?: number;
  caption?: string;
};

export function buildImageObject(image: ImageInput, id?: string): ImageObjectNode {
  return {
    '@type': 'ImageObject',
    ...(id ? { '@id': id } : {}),
    url: image.url,
    contentUrl: image.url,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    ...(image.caption ? { caption: image.caption } : {})
  };
}

/** Plain text from a Storyblok rich text document. */
export function richTextToPlainText(doc: RichtextStoryblok | undefined | null): string {
  if (!doc) return '';
  const parts: string[] = [];

  const walk = (node: RichtextStoryblok) => {
    if (typeof node.text === 'string') parts.push(node.text);
    if (node.type === 'hard_break') parts.push('\n');
    node.content?.forEach(walk);
    if (node.type === 'paragraph' || node.type === 'heading' || node.type === 'list_item') {
      parts.push('\n');
    }
  };

  walk(doc);
  return parts
    .join('')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

/**
 * Collects every string value inside a story's content tree, including rich
 * text. Used to check that FAQ questions from the manual field are visible
 * on the page.
 */
export function collectVisibleText(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectVisibleText(item, out));
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      // Skip SEO-only fields and the manual JSON-LD itself: they are not visible on the page.
      if (key.startsWith('seo_') || key === 'structure_data_markup') continue;
      collectVisibleText(child, out);
    }
  }
  return out;
}

export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Formats an ISO-ish Storyblok date as an ISO 8601 string, or undefined if invalid. */
export function toIsoDate(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(
    value.includes('T') || value.length <= 10 ? value : value.replace(' ', 'T')
  );
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
