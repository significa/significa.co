import { graphql } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Projects } from '../components/Showcase'
import { CallToAction } from '../components/UI'

export interface Project {
  url: string
  uid: string
  data: {
    listed: boolean
    hero_theme: string
    themes: Array<{ name: string; background: string }>
    project_title: string
    tagline: string
    services: Array<{
      service: string
    }>
    thumb_image: {
      alt: string
      gatsbyImageData: IGatsbyImageData
    }
  }
}

interface Showcase {
  data: {
    showcaseYaml: {
      seo: {
        title: string
        description: string
      }
      cta: {
        title: string
        text: string
        link: string
        linkText: string
      }
    }
    allPrismicProject: {
      nodes: Project[]
    }
  }
}

const Showcase: React.FC<Showcase> = ({ data }) => {
  const listedProjects = data.allPrismicProject.nodes.filter(node => node.data.listed)

  return (
    <Layout>
      <SEO
        title={data.showcaseYaml.seo.title}
        description={data.showcaseYaml.seo.description}
      />

      <Projects projects={listedProjects} />

      <CallToAction {...data.showcaseYaml.cta} />
    </Layout>
  )
}

export default Showcase

export const query = graphql`
  query ShowcaseQuery {
    showcaseYaml {
      seo {
        title
        description
      }
      cta {
        title
        text
        link
        linkText
      }
    }

    allPrismicProject(sort: { fields: first_publication_date, order: DESC }) {
      nodes {
        url
        uid
        data {
          listed
          hero_theme
          themes {
            name
            background
          }
          project_title
          tagline
          services {
            service
          }
          thumb_image {
            alt
            gatsbyImageData
          }
        }
      }
    }
  }
`
