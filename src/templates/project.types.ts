import { FluidObject } from 'gatsby-image'
import { IColorsTheme } from '@theme'
import { SectionsType } from '../components/Projects/Section/types'

type Theme = IColorsTheme & {
  name: string
}

interface ImageObject {
  childImageSharp: {
    fluid: FluidObject
    resize: {
      height: number
    }
  }
}

export interface IProject {
  main_theme: string
  hero_theme: string
  themes: Theme[]

  seo_title: string
  seo_description: string
  seo_og_image: {
    url: string
  }

  project_title: string
  tagline: string
  hero_imageSharp: ImageObject

  description: string
  client: string
  services: Array<{ service: string }>
  deliverables: Array<{ deliverable: string }>
  links: Array<{ link_text: string; link: { url: string } }>

  next_project: {
    hero_theme: string
    themes: Theme[]
    project_title: string
    tagline: string
    _meta: {
      type: string
      uid: string
    }
  }

  body: SectionsType[]
}
