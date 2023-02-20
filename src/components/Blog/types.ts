import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface AuthorSocial {
  link: string
  social:
  | 'Behance'
  | 'Github'
  | 'Dribbble'
  | 'Instagram'
  | 'Professional email'
  | 'Personal website'
}

export interface Author {
  name: string
  position: string
  description: {
    html: string
  }
  profile_pic: {
    alt: string
    url: string
    gatsbyImageData: IGatsbyImageData
  }
  social_links: AuthorSocial[]
}

export interface BlogPost {
  uid: string
  type: string

  data: {
    meta_title: string
    meta_description: string
    listed: boolean
    meta_image_share: {
      alt: string
      url: string
      fixed: {
        src: string
      }
    }

    date: string

    title: string
    teaser: string
    author: {
      url: string
      document: {
        data: Author
      }
    }
    category: string

    tags: Array<{ tag: string }>
    hero: {
      alt: string
      url: string
      gatsbyImageData: IGatsbyImageData
    }

    content: {
      html: string
      raw: object
    }
  }
}
