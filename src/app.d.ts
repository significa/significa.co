// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};

declare namespace svelte.JSX {
  export interface HTMLAttributes {
    // If you want to use on:beforeinstallprompt
    onoutclick?: () => void;
  }
}
