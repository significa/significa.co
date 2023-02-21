import type { StorybookConfig } from '@storybook/sveltekit';
import path from 'path';
import { mergeConfig } from 'vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          $app: path.resolve(process.cwd(), './__mocks__/$app'),
          $components: path.resolve(process.cwd(), './src/components'),
          $lib: path.resolve(process.cwd(), './src/lib'),
          $types: path.resolve(process.cwd(), './src/types'),
          $styles: path.resolve(process.cwd(), './src/styles')
        }
      }
    });
  }
};
export default config;
