import { layoutTypes, sectionTypes } from './types'

const widths: { [K in layoutTypes]: string } = {
  small: '38.4375em',
  normal: '52.3125em',
  medium: '66.1875em',
  large: '80em',
  full: '100%',
}

const defaultValues: { [K in sectionTypes]: layoutTypes } = {
  comparison: 'normal',
  gallery: 'normal',
  image: 'normal',
  slideshow: 'normal',
  sticky: 'medium',
  testimonial: 'normal',
  text: 'small',
  video: 'normal',
  waterfall: 'large',
  highlight: 'normal',
}

const getProjectSectionWidth = (type: sectionTypes, layout?: layoutTypes) => {
  if (layout) {
    return widths[layout]
  }

  return widths[defaultValues[type]]
}

export { getProjectSectionWidth }
