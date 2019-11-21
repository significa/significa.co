import { FluidObject } from 'gatsby-image'

type DocumentImage = {
  dimensions: {
    width: number
    height: number
  }
  alt: string
  url: string
}

export type AuthorSocial = {
  link: string
  options:
    | 'Behance'
    | 'Github'
    | 'Dribbble'
    | 'Instagram'
    | 'Professional email'
    | 'Personal website'
}

export interface Author {
  id: string
  name: string
  position: string
  profile_pic: DocumentImage
  social_links: Array<AuthorSocial>
}

export interface BlogPost {
  id: string
  meta_title: string
  meta_description: string
  meta_image_share: string
  date: string

  title: string
  description: string
  author: Author
  category: string

  tags: string[]
  hero: DocumentImage

  content: string
}
