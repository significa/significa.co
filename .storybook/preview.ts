import '../src/styles/index.css';

import ThemeDecorator from './theme-decorator.svelte';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'Light',
    toolbar: {
      icon: 'paintbrush',
      items: ['Light', 'Dark', 'Yellow'],
      dynamicTitle: true
    }
  }
};

export const decorators = [
  (_, ctx) => {
    return {
      Component: ThemeDecorator,
      props: { theme: ctx.globals.theme.toLowerCase() }
    };
  }
];
