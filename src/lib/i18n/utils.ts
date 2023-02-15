import { dev } from '$app/environment';

const PATTERN = /\{\{(.*?)\}\}/gim;

export const getMessage = (messages: Record<string, string>, id: string): string => {
  if (!messages[id]) {
    if (dev) {
      console.error(`Translation '${id}' not found.`);
    }

    messages[id] = id;
  }

  return messages[id];
};

export const getMatches = (message: string): RegExpMatchArray | null => {
  return message.match(PATTERN);
};

export const parseMatchesForKey = <T extends Record<string, unknown> = Record<string, string>>(
  matches: RegExpMatchArray,
  key: string,
  values: T
): T => {
  for (const match of matches) {
    const matchName = match.replace(/\{\{|\}\}/gim, '');
    if (!values[matchName]) {
      if (dev) {
        console.error(`Missing value: \`${matchName}\` for translation key: \`${key}\``);
      }

      return { ...values, [matchName]: matchName };
    }
  }

  return values;
};

export const getParts = (message: string): string[] => {
  return message.split(PATTERN);
};
