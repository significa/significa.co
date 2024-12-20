const SEPARATOR = ' – ' as const;

const trimLeadingSlash = (path: string) => path.replace(/\/$/, '');
export const isNestedPath = (path: string) => trimLeadingSlash(path).split('/').length > 2;
export const trimChapterNumber = (chapter: string) => +chapter.split(SEPARATOR)[0] || 1;

export const ju_isNestedPath = (path: string) => trimLeadingSlash(path).split('/').length > 3;

export const formatTitle = (title: string | null) => {
  return (title || '')
    .split('-')
    .filter((word: string) => word !== 'new' && !/^\d+$/.test(word)) //Remove 'new' and number-only words
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
