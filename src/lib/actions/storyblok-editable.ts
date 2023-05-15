import { storyblokEditable as sbEdit, type SbBlokData } from '@storyblok/js';

export const storyblokEditable = (node: HTMLElement, value: SbBlokData) => {
  const updateDom = (value: SbBlokData) => {
    const options = sbEdit(value);
    if (options['data-blok-c']) {
      node.setAttribute('data-blok-c', options['data-blok-c']);
      node.setAttribute('data-blok-uid', options['data-blok-uid']);
      node.classList.add('storyblok__outline');
    }
  };

  updateDom(value); // when is mounted

  return {
    update(newValue: SbBlokData) {
      // when value changes
      updateDom(newValue);
    }
  };
};
