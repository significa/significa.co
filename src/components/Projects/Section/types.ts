import { FluidObject } from 'gatsby-image'

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
  slice_type: 'chapter'
  primary: {
    theme: StringOrNull
    title: string
    show_title: StringBoolean
  }
}

export interface SectionType {
  slice_type: 'section'
  primary: {
    title: string
  }
}

export interface TextType {
  slice_type: 'text'
  primary: SectionBase & {
    title: StringOrNull
    text: string
    link?: StringOrNull
    link_to?: StringOrNull
  }
}

export interface ImageType {
  slice_type: 'image'
  primary: SectionBase & {
    image: {
      url?: string
      alt: StringOrNull
      fluid: FluidObject
    }
    caption: StringOrNull
  }
}

export interface VideoType {
  slice_type: 'video'
  primary: SectionBase & {
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
  slice_type: 'image_gallery'
  primary: SectionBase & {
    caption: StringOrNull
    columns: number
  }
  items: Array<{
    image: {
      alt: string
      url?: string
      fluid: FluidObject
    }
    span: number
    span_tablet: number
    span_mobile: number
  }>
}

export interface ComparisonType {
  slice_type: 'comparison'
  primary: SectionBase & {
    caption: StringOrNull
    image_a: {
      alt: string
      url?: string
      fluid: FluidObject
    }
    image_b: {
      alt: string
      url?: string
      fluid: FluidObject
    }
  }
}

export interface SlideshowType {
  slice_type: 'slideshow'
  primary: SectionBase & {
    caption: StringOrNull
  }
  items: Array<{
    image: {
      alt: string
      url?: string
      fluid: FluidObject
    }
  }>
}

export interface WaterfallType {
  slice_type: 'waterfall'
  primary: SectionBase
  items: Array<{
    image: {
      dimensions: {
        height: number
      }
      alt: string
      url?: string
      fluid: FluidObject
    }
  }>
}

export interface TestimonialType {
  slice_type: 'testimonial'
  primary: SectionBase & {
    author: string
    text: string
    link: StringOrNull
    link_to: StringOrNull
  }
}

export interface EmbedType {
  slice_type: 'embed'
  primary: SectionBase & {
    code: {
      html: string
    }
  }
}

export interface HighlightType {
  slice_type: 'highlight'
  primary: SectionBase & {
    text: string
  }
}

export interface StickyImageType {
  slice_type: 'sticky_image'
  primary: SectionBase & {
    invert: StringBoolean
    is_sticky: StringBoolean
    text: string
    title: StringOrNull
    image: {
      alt: string
      url?: string
      fluid: FluidObject
    }
  }
}

export interface StickyVideoType {
  slice_type: 'sticky_video'
  primary: SectionBase & {
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
