import { exec } from 'child_process';
import fs from 'fs';
import * as dotenv from 'dotenv';
import { apiPlugin, storyblokInit } from '@storyblok/js';

dotenv.config();

const PUBLIC_STORYBLOK_TOKEN = process.env.PUBLIC_STORYBLOK_TOKEN;

if (!PUBLIC_STORYBLOK_TOKEN) {
  throw new Error('Missing required env var: PUBLIC_STORYBLOK_TOKEN');
}

const { storyblokApi } = storyblokInit({
  accessToken: PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    https: true
  }
});

export const storyblok = storyblokApi as NonNullable<
  ReturnType<typeof storyblokInit>['storyblokApi']
>;

type Datasource = { name: string; value: string; dimension_value: string | null };

type Config = {
  outputDir: string;
  type: string;
  fetcher: () => Promise<{ data: string; keys: string[] }>;
};

const entries: Config[] = [
  // i18n
  {
    type: 'TranslationKey',
    outputDir: './src/lib/i18n',
    fetcher: async () => {
      const strings: Record<string, string> = {};

      const translationsRes = await storyblok.get('cdn/datasource_entries', {
        datasource: 'strings',
        per_page: 1000,
        cv: Date.now()
      });
      const entries: Datasource[] = translationsRes.data.datasource_entries;
      entries.forEach((entry) => {
        strings[entry.name] = entry.value;
      });

      return {
        keys: Object.keys(strings),
        data: JSON.stringify(strings, null, 2)
      };
    }
  }
];

async function main() {
  for (const entry of entries) {
    const { data, keys } = await entry.fetcher();

    let types = `export const ${entry.type}s = [${keys
      .map((key) => `'${key}'`)
      .join(' , ')}] as const\n`;

    types += `
      export type ${entry.type} = typeof ${entry.type}s[number]
      export function is${entry.type}(
        key: string | ${entry.type}
      ): key is ${entry.type} {
        return ${entry.type}s.includes(key as ${entry.type})
      }
    `;

    fs.writeFileSync(`${entry.outputDir}/data.json`, data);
    fs.writeFileSync(`${entry.outputDir}/types.ts`, types);
    exec(`npx prettier --plugin-search-dir . --write ${entry.outputDir}`);
  }
}

main();
