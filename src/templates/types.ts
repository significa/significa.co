import { FluidObject } from 'gatsby-image'

export interface ILinkObject {
  url: string
  text: string
}

export interface IImageObject {
  childImageSharp: {
    fluid: FluidObject
  }
}

export interface IVideoObject {
  publicURL: string
}

export type layoutTypes = 'small' | 'normal' | 'medium' | 'large' | 'full'

export type marginTypes = 'none' | 'top' | 'bottom' | 'both'

export interface ISpanTypes {
  normal: number
  tablet: number
  mobile: number
}

// Text
export interface IText {
  title?: string
  text: string
  link?: ILinkObject
}

// Image
export interface IImage {
  image: IImageObject
  caption?: string
}

// Video
export interface IVideo {
  video: IVideoObject
  autoplay?: boolean
  loop?: boolean
  controls?: boolean
  muted?: boolean
}

// Gallery
export interface IGalleryImage {
  span: ISpanTypes
  image: IImageObject
}

export interface IGalleryVideo {
  span: ISpanTypes
  video: IVideoObject
}

export interface IGallery {
  columns: number
  items: Array<IGalleryImage | IGalleryVideo>
  caption?: string
}

// Comparison
export interface IComparison {
  a: IImageObject
  b: IImageObject
  caption?: string
}

// Slideshow
export interface ISlideshow {
  caption?: string
  items: Array<{ image: IImageObject }>
}

// Waterfall
export interface IWaterfall {
  items: Array<{ image: IImageObject }>
}

// Testimonial
export interface ITestimonial {
  text: string
  author: string
  link?: ILinkObject
}

// Sticky
interface IStickyBase {
  sticky: boolean
  invert: boolean
  text: string
  title?: string
}

export interface IStickyVideo extends IStickyBase {
  video: IVideoObject
}

export interface IStickyImage extends IStickyBase {
  image: IImageObject
}

export type ISticky = IStickyVideo | IStickyImage

// Highlight
export interface IHighlight {
  text: string
}

// All of them
export type sectionTypes =
  | 'text'
  | 'image'
  | 'video'
  | 'gallery'
  | 'comparison'
  | 'slideshow'
  | 'waterfall'
  | 'testimonial'
  | 'sticky'
  | 'highlight'
export type SectionContent =
  | IText
  | IImage
  | IVideo
  | IGallery
  | IComparison
  | ISlideshow
  | IWaterfall
  | ITestimonial
  | ISticky
  | IHighlight

export interface ISection {
  type: sectionTypes
  theme: string
  layout?: layoutTypes
  margin?: marginTypes
  content: SectionContent
}
