import { exec } from 'child_process';
import fs from 'fs';
import https from 'https';
import * as dotenv from 'dotenv';
import { Client } from '@notionhq/client';
import type {
  BlockObjectResponse,
  PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

dotenv.config();

const NOTION_DB_HANDBOOK = process.env.NOTION_DB_HANDBOOK;
const NOTION_TOKEN = process.env.NOTION_TOKEN;

const COVERS_PATH = './static/handbook/covers/';
const IMAGES_PATH = './static/handbook/images/';
const FILES_PATH = './static/handbook/files/';
const SEO_IMAGES_PATH = './static/handbook/seo/';
const FILENAME = './handbook.json';

if (!NOTION_TOKEN) {
  throw new Error('Missing env var: NOTION_TOKEN');
}

if (!NOTION_DB_HANDBOOK) {
  throw new Error('Missing required env var: NOTION_DB_HANDBOOK');
}

const notion = new Client({ auth: NOTION_TOKEN });

function downloadFile(image, filePath) {
  const verbose =
    process.argv.indexOf('-v') > -1 || process.argv.indexOf('--verbose') > -1 ? true : false;

  const file = fs.createWriteStream(filePath);
  let url;

  if (image.type === 'external') {
    url = image.external.url;
  } else if (image.type === 'file') {
    url = image.file.url;
  }

  https
    .get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        verbose && console.log(`File downloaded to ${filePath}`);
      });
    })
    .on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`Error downloading file: ${err.message}`);
    });
}

async function getChildren(id) {
  const verbose =
    process.argv.indexOf('-v') > -1 || process.argv.indexOf('--verbose') > -1 ? true : false;
  const download =
    process.argv.indexOf('-d') > -1 || process.argv.indexOf('--download') > -1 ? true : false;

  let blocks: BlockObjectResponse[] = [];
  let cursor;

  verbose && console.log('Fetching page: ', id);

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    const { results, next_cursor } = await notion.blocks.children.list({
      start_cursor: cursor,
      block_id: id
    });

    blocks = <BlockObjectResponse[]>[...blocks, ...results];

    if (!next_cursor) {
      break;
    }
    cursor = next_cursor;
  }

  const values = Promise.all(
    blocks.map(async ({ id, has_children, ...block }) => {
      let children;

      verbose && console.log('Fetching children: ', id);

      if (block.type === 'image' && download) {
        const path = `${IMAGES_PATH}${id}`;

        downloadFile(block.image, path);
      }

      if (block.type === 'file' && download) {
        const path = `${FILES_PATH}${block.file.name}`;

        downloadFile(block.file, path);
      }

      if (
        block.type === 'synced_block' &&
        block?.synced_block?.synced_from &&
        'synced_from' in block.synced_block
      ) {
        const syncedBlock = await notion.blocks.retrieve({
          block_id: block.synced_block.synced_from.block_id
        });

        children = await getChildren(block.synced_block.synced_from.block_id);

        return {
          ...syncedBlock,
          children: children
        };
      }

      if (has_children) {
        children = await getChildren(id);
      }

      return {
        id,
        has_children,
        ...block,
        children: children
      };
    })
  );

  return values;
}

async function main() {
  const verbose =
    process.argv.indexOf('-v') > -1 || process.argv.indexOf('--verbose') > -1 ? true : false;
  const download =
    process.argv.indexOf('-d') > -1 || process.argv.indexOf('--download') > -1 ? true : false;

  let pages: PageObjectResponse[] = [];
  let cursor;

  if (NOTION_DB_HANDBOOK) {
    verbose && console.log('Starting data fetch');
    verbose && console.log('Fetching page list');

    if (download) {
      !fs.existsSync(COVERS_PATH) && fs.mkdirSync(COVERS_PATH, { recursive: true });
      !fs.existsSync(FILES_PATH) && fs.mkdirSync(FILES_PATH, { recursive: true });
      !fs.existsSync(IMAGES_PATH) && fs.mkdirSync(IMAGES_PATH, { recursive: true });
      !fs.existsSync(SEO_IMAGES_PATH) && fs.mkdirSync(SEO_IMAGES_PATH, { recursive: true });
    }

    /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
    while (true) {
      const { results, next_cursor } = await notion.databases.query({
        database_id: NOTION_DB_HANDBOOK,
        start_cursor: cursor,
        filter: {
          property: 'Status',
          status: {
            equals: 'Ready to Publish'
          }
        }
      });

      pages = [...pages, ...(results as PageObjectResponse[])];

      if (!next_cursor) {
        break;
      }
      cursor = next_cursor;
    }

    if (download) {
      pages.map((page) => {
        if ('cover' in page && page.cover) {
          const path = `${COVERS_PATH}${page.id}`;

          downloadFile(page.cover, path);
        }

        if (
          'files' in page.properties['OG image'] &&
          page.properties['OG image'].files[0] &&
          'file' in page.properties['OG image'].files[0]
        ) {
          const path = `${SEO_IMAGES_PATH}${page.id}`;

          downloadFile(page.properties['OG image'].files[0], path);
        }
      });
    }

    const children = pages.map(async ({ id, ...page }) => {
      const children = await getChildren(id);

      return {
        id,
        ...page,
        children: children
      };
    });

    Promise.all(children).then((values) => {
      verbose && console.log('Data fetch complete');
      verbose && console.log('File writing started');

      fs.writeFileSync(`${FILENAME}`, JSON.stringify(values));
      exec(`npx prettier --write ${FILENAME}`);

      // fs.writeFileSync(`./handbook.json`, JSON.stringify(values));
      // exec(`npx prettier --write ./handbook.json`);

      verbose && console.log('File writing complete');
    });
  }
}

main();
