import { layoutTypes, SectionsType, completeLayoutTypes } from './types'

const widths: { [K in layoutTypes]: string } = {
  small: '38.4375em',
  normal: '52.3125em',
  medium: '66.1875em',
  large: '80em',
  full: '100%',
}

const defaultValues: { [key in SectionsType['slice_type']]: layoutTypes } = {
  chapter: 'full',
  section: 'full',
  text: 'small',
  image: 'normal',
  image_gallery: 'normal',
  comparison: 'normal',
  slideshow: 'normal',
  video: 'normal',
  waterfall: 'large',
  testimonial: 'normal',
  highlight: 'normal',
  embed: 'normal',
  sticky_image: 'medium',
  sticky_video: 'medium',
}

const getProjectSectionWidth = (
  type: SectionsType['slice_type'],
  layout: completeLayoutTypes
) => {
  if (layout !== 'auto') {
    return widths[layout]
  }

  return widths[defaultValues[type]]
}

export { getProjectSectionWidth }
