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
  query($slug: String!) {
    projectsYaml(fields: { slug: { eq: $slug } }) {
      title
      tagline
      description
      hero {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      heroTheme
      mainTheme
      themes {
        name
        background
        foreground
        highlight
        medium
        subtle
        error
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
          image {
            childImageSharp {
              fluid(maxWidth: 3000) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          caption
          title
          text
          link {
            url
            text
          }
          video {
            publicURL
          }
          autoplay
          loop
          items {
            span {
              normal
              tablet
              mobile
            }
            image {
              childImageSharp {
                fluid(maxWidth: 3000) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
            video {
              publicURL
            }
          }
          a {
            childImageSharp {
              fluid(maxWidth: 3000) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          b {
            childImageSharp {
              fluid(maxWidth: 3000) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          author
          sticky
          invert
        }
      }
    }
  }
`
