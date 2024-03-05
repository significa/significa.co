// See https://kit.svelte.dev/docs/types#app

import type { RecognitionEntryStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      version: 'published' | 'draft';
    }
    interface PageData {
      awards: ISbStoryData<RecognitionEntryStoryblok>[];
    }
    // interface Platform {}
  }
}

export {};
