import type {
  PageObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';
import { slugify } from '$lib/utils/paths.js';

type Image =
  | {
      type: 'external';
      external: { url: string };
      caption?: Array<RichTextItemResponse>;
    }
  | {
      type: 'file';
      file: { url: string; expiry_time: string };
      caption?: Array<RichTextItemResponse>;
    };

type Page = {
  id: string;
  title: string;
  slug: string;
  chapter: string;
  order: number;
  parent?: string;
  highlighted?: boolean;
  hasCover: boolean;
  children?: Array<Page>;
  lastUpdatedAt: string;
};

export const createFileTree = (handbook: Array<PageObjectResponse>) => {
  const pageList: Array<Page> = handbook.map((page) => ({
    id: page.id,
    title: getPageTitle(page),
    slug: slugify(getPageTitle(page)),
    ...('relation' in page.properties['Parent item'] && {
      parent: page.properties['Parent item'].relation[0]?.id
    }),
    hasCover: page.cover !== null,
    chapter:
      'select' in page.properties['Chapter'] && page.properties['Chapter'].select?.name
        ? page?.properties['Chapter'].select?.name
        : '',
    order:
      'number' in page.properties['Order'] && page.properties['Order'].number
        ? page.properties['Order'].number
        : 0,
    ...('checkbox' in page.properties['Highlighted'] && {
      highlighted: page.properties['Highlighted'].checkbox
    }),
    lastUpdatedAt: page.last_edited_time
  }));

  const pageTree = pageList
    .map((page) => ({
      ...page,
      children: pageList.filter((p) => p.parent === page.id).sort((a, b) => a.order - b.order)
    }))
    .filter((page) => !(page.parent && page.children.length === 0))
    .sort((a, b) => a.order - b.order);

  const fileTree: { [key: string]: Array<Page> } = pageTree
    .sort((a, b) => a.chapter.localeCompare(b.chapter))
    .reduce(
      (groups, page) => ({
        ...groups,
        [page.chapter]: [...(groups[page.chapter] || []), page]
      }),
      {} as { [key: string]: Array<Page> }
    );

  return fileTree;
};

export const renderText = (richText: Array<RichTextItemResponse> | undefined) => {
  return richText ? richText.map(({ plain_text }) => plain_text).join('') : '';
};

export const renderImg = (image: Image) => {
  return {
    src: image.type === 'external' ? image.external.url : image.file.url,
    caption: image.caption ? image.caption[0]?.plain_text : ''
  };
};

export const getPageTitle = (page: Partial<PageObjectResponse>) => {
  if (page?.properties?.['Name'] && 'title' in page.properties['Name']) {
    return page.properties['Name'].title[0].plain_text;
  }

  return '';
};

export const getPageDescription = (page: Partial<PageObjectResponse>) => {
  const richText =
    page?.properties?.['Meta description'] && 'rich_text' in page.properties['Meta description']
      ? page?.properties?.['Meta description']?.rich_text
      : undefined;

  return renderText(richText);
};

type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  color: string;
  code: boolean;
};

export const annotationsToCSS = ({ color, ...annotations }: Annotations) => {
  const classes = {
    bold: 'font-bold',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline'
  };

  const colors = {
    blue: 'text-[#0055FF]',
    blue_background: 'bg-[#0055FF]',
    brown: '',
    brown_background: '',
    default: '',
    gray: 'text-[#C6C6C8]',
    gray_background: 'bg-[#C6C6C8]',
    green: 'text-[#078366]',
    green_background: 'bg-[#078366]',
    orange: 'text-[#FF9500]',
    orange_background: 'bg-[#FF9500]',
    pink: '',
    pink_background: '',
    purple: '',
    purple_background: '',
    red: 'text-[#F00]',
    red_background: 'bg-[#F00]',
    yellow: 'text-[#FFD722]',
    yellow_background: 'bg-[#FFD722]'
  };

  return Object.entries(annotations)
    .filter(([_key, result]) => result)
    .map(([key, _result]) => classes[key as keyof typeof classes])
    .join(' ')
    .concat(' ', colors[color as keyof typeof colors]);
};
