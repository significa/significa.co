import { FluidObject } from 'gatsby-image'
import { IColorsTheme } from '@theme'
import { SectionsType } from '../components/Projects/Section/types'

type Theme = IColorsTheme & {
  name: string
}

export interface IProject {
  main_theme: string
  hero_theme: string
  navigation_theme: string
  themes: Theme[]

  seo_title: string
  seo_description: string
  seo_og_image: {
    url: string
  }

  project_title: string
  tagline: string
  hero_image: {
    fluid: FluidObject
    url?: string
  }

  description: string
  client: string
  services: Array<{ service: string }>
  deliverables: Array<{ deliverable: string }>
  links: Array<{ link_text: string; link: { url: string } }>

  next_project: {
    document: {
      url: string
      data: {
        hero_theme: string
        themes: Theme[]
        project_title: string
        tagline: string
      }
    }
  }

  body: SectionsType[]
}
