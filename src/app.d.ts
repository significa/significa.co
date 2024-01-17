// See https://kit.svelte.dev/docs/types#app

import type { RecognitionEntryStoryblok, RecognitionTypeStoryblok } from '$types/bloks';
import type { ISbStoryData } from '@storyblok/js';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      awards: (ISbStoryData<RecognitionEntryStoryblok> & {
        recognition: ISbStoryData<RecognitionTypeStoryblok>;
      })[];
    }
    // interface Platform {}
  }
}

export {};
