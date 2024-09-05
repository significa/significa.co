const SEPARATOR = ' – ' as const;

const trimLeadingSlash = (path: string) => path.replace(/\/$/, '');
export const isNestedPath = (path: string) => trimLeadingSlash(path).split('/').length > 2;
export const trimChapterNumber = (chapter: string) => +chapter.split(SEPARATOR)[0] || 1;
