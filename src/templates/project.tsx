import React from 'react'
import { graphql } from 'gatsby'

import { Theme } from '@theme'

import { getProjectTheme } from '../utils/getProjectTheme'
import { IProject } from './types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Meta, Hero, Section } from '../components/Projects/'

const Project = ({ data }: IProject) => {
  const { projectsYaml: content } = data

  return (
    <Layout
      theme={getProjectTheme(content.mainTheme, content.themes)}
      headerTheme={getProjectTheme(content.heroTheme, content.themes)}
      footerTheme="light"
    >
      <SEO title={content.title} description={content.description} />
      <Theme theme={getProjectTheme(content.heroTheme, content.themes)}>
        <Hero
          title={content.title}
          tagline={content.tagline}
          fluid={content.hero.childImageSharp.fluid}
        />
      </Theme>
      <Meta
        description={content.description}
        client={content.client}
        services={content.services}
        deliverables={content.deliverables}
        links={content.links}
      />
      {content.sections.map((section, i) => (
        <Section
          key={i}
          section={section}
          theme={getProjectTheme(section.theme, content.themes)}
        />
      ))}
    </Layout>
  )
}

export default Project

export const query = graphql`
  fragment Theme on themes_2 {
    name
    background
    foreground
    highlight
    medium
    subtle
    error
  }

  fragment Image on File {
    childImageSharp {
      fluid(maxWidth: 3000) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }

  fragment AllSectionsContent on content_5 {
    # Image

    image {
      ...Image
    }
    caption

    # Text

    title
    text
    link {
      url
      text
    }

    # Video

    video {
      publicURL
    }
    autoplay
    loop
    controls
    muted

    # Gallery / Slider / Slideshow (not 'video') / waterfall

    #caption
    items {
      span {
        normal
        tablet
        mobile
      }
      image {
        ...Image
      }
      video {
        publicURL
      }
    }

    # Comparison

    #caption
    a {
      ...Image
    }
    b {
      ...Image
    }

    # Testimonial

    #text
    #link
    author

    # Sticky

    sticky
    invert
    #title
    #image/video
    #text

    # Highlight

    #text
  }

  query($slug: String!) {
    projectsYaml(fields: { slug: { eq: $slug } }) {
      title
      tagline
      description
      hero {
        ...Image
      }
      heroTheme
      mainTheme
      themes {
        ...Theme
      }
      client
      services
      deliverables
      links {
        link
        linkText
      }
      sections {
        type
        layout
        theme
        margin
        content {
          ...AllSectionsContent
        }
      }
    }
  }
`
