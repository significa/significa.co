import { FluidObject } from 'gatsby-image'

interface ImageObject {
  childImageSharp: {
    fluid: FluidObject
    resize: {
      height: number
    }
  }
}

export type layoutTypes = 'small' | 'normal' | 'medium' | 'large' | 'full'

export type completeLayoutTypes = 'auto' & layoutTypes

export type marginTypes = 'none' | 'top' | 'bottom' | 'both'

type StringOrNull = string | null

type StringBoolean = 'true' | 'false'

export interface SectionBase {
  layout: completeLayoutTypes
  margin: marginTypes
  theme: StringOrNull
}

export interface ChapterType {
  type: 'chapter'
  chapter: {
    show_title: StringBoolean
    title: string
    theme: StringOrNull
  }
}

export interface SectionType {
  type: 'section'
  section: {
    title: string
  }
}

export interface TextType {
  type: 'text'
  text: SectionBase & {
    title: StringOrNull
    text: string
    link?: StringOrNull
    link_to?: StringOrNull
  }
}

export interface ImageType {
  type: 'image'
  image: SectionBase & {
    image: {
      alt: StringOrNull
    }
    imageSharp: ImageObject
    caption: StringOrNull
  }
}

export interface VideoType {
  type: 'video'
  video: SectionBase & {
    autoplay: StringBoolean
    caption: StringBoolean
    controls: StringBoolean
    loop: StringBoolean
    mute: StringBoolean
    video: {
      url: string
    }
  }
}

export interface GalleryType {
  type: 'image_gallery'
  image_gallery: SectionBase & {
    caption: StringOrNull
    columns: number
  }
  image_gallery_images: Array<{
    image: {
      alt: string
    }
    imageSharp: ImageObject
    span: number
    span_tablet: number
    span_mobile: number
  }>
}

export interface ComparisonType {
  type: 'comparison'
  comparison: SectionBase & {
    caption: StringOrNull
    image_a: {
      alt: string
    }
    image_aSharp: ImageObject
    image_b: {
      alt: string
    }
    image_bSharp: ImageObject
  }
}

export interface SlideshowType {
  type: 'slideshow'
  slideshow: SectionBase & {
    caption: StringOrNull
  }
  slideshow_images: Array<{
    image: {
      alt: string
    }
    imageSharp: ImageObject
  }>
}

export interface WaterfallType {
  type: 'waterfall'
  waterfall: SectionBase
  waterfall_images: Array<{
    image: {
      alt: string
    }
    imageSharp: ImageObject
  }>
}

export interface TestimonialType {
  type: 'testimonial'
  testimonial: SectionBase & {
    author: string
    text: string
    link: StringOrNull
    link_to: StringOrNull
  }
}

export interface EmbedType {
  type: 'embed'
  embed: SectionBase & {
    code: {
      html: string
    }
  }
}

export interface HighlightType {
  type: 'highlight'
  highlight: SectionBase & {
    text: string
  }
}

export interface StickyImageType {
  type: 'sticky_image'
  sticky_image: SectionBase & {
    invert: StringBoolean
    is_sticky: StringBoolean
    text: string
    title: StringOrNull
    image: {
      alt: string
    }
    imageSharp: ImageObject
  }
}

export interface StickyVideoType {
  type: 'sticky_video'
  sticky_video: SectionBase & {
    invert: StringBoolean
    is_sticky: StringBoolean
    text: string
    title: StringOrNull
    video: {
      url: string
    }
  }
}

export type SectionsType =
  | ChapterType
  | SectionType
  | TextType
  | ImageType
  | VideoType
  | GalleryType
  | ComparisonType
  | SlideshowType
  | WaterfallType
  | TestimonialType
  | EmbedType
  | HighlightType
  | StickyImageType
  | StickyVideoType
