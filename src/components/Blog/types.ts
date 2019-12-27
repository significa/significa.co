import { FluidObject } from 'gatsby-image'

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
  _meta: {
    uid: string
    type: string
  }
  name: string
  position: string
  description: string
  profile_pic: { alt: string; url: string }
  profile_picSharp: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
  social_links: AuthorSocial[]
}

export interface BlogPost {
  _meta: {
    uid: string
    type: string
  }

  meta_title: string
  meta_description: string
  meta_image_shareSharp: {
    childImageSharp: {
      fixed: {
        src: string
      }
    }
  }
  date: string

  title: string
  teaser: string
  author: Author
  category: string

  tags: Array<{ tag: string }>
  hero: { alt: string; url: string }
  heroSharp: {
    childImageSharp: {
      fluid: FluidObject
    }
  }

  content: string
}
