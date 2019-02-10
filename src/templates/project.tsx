import React from 'react'
import { graphql } from 'gatsby'

import { Theme, IColorsTheme } from '@theme'

import { getProjectTheme } from '../utils/getProjectTheme'
import { IImageObject, ISection } from '../components/Projects/Section/types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Meta, Hero, Section, Next, Chapter } from '../components/Projects/'
import ConditionalWrap from '../components/utils/ConditionalWrap'

interface ITheme extends IColorsTheme {
  name: string
}

export interface IProject {
  pageContext: {
    next: {
      title: string
      tagline: string
      hero: IImageObject
      heroTheme: string
      themes?: ITheme[]
      fields: {
        slug: string
      }
    }
  }
  data: {
    projectsYaml: {
      title: string
      tagline: string
      description: string
      hero: IImageObject
      heroTheme: string
      mainTheme: string
      themes?: ITheme[]
      client?: string
      services?: string[]
      deliverables?: string[]
      links?: Array<{
        link: string
        linkText: string
      }>
      content: Array<{
        title?: string
        theme?: string
        showTitle?: boolean
        content: Array<{
          title?: string
          sections: ISection[]
        }>
      }>
    }
  }
}

const Project = ({ data, pageContext: { next } }: IProject) => {
  const { projectsYaml } = data

  return (
    <Layout
      theme={getProjectTheme(projectsYaml.mainTheme, projectsYaml.themes)}
      headerTheme={getProjectTheme(projectsYaml.heroTheme, projectsYaml.themes)}
      footerTheme="light"
    >
      <SEO title={projectsYaml.title} description={projectsYaml.description} />
      <Theme
        theme={getProjectTheme(projectsYaml.heroTheme, projectsYaml.themes)}
      >
        <Hero
          title={projectsYaml.title}
          tagline={projectsYaml.tagline}
          fluid={projectsYaml.hero.childImageSharp.fluid}
        />
      </Theme>
      <Meta
        description={projectsYaml.description}
        client={projectsYaml.client}
        services={projectsYaml.services}
        deliverables={projectsYaml.deliverables}
        links={projectsYaml.links}
      />
      {projectsYaml.content.map((chapter, i) => {
        const sections: ISection[] = chapter.content.reduce(
          (acc: ISection[], s) => {
            return [...acc, ...s.sections]
          },
          []
        )

        return (
          <React.Fragment key={i}>
            {chapter.showTitle && chapter.title && (
              <ConditionalWrap
                condition={!!chapter.theme}
                wrap={children => (
                  <Theme
                    theme={getProjectTheme(
                      chapter.theme as string,
                      projectsYaml.themes
                    )}
                  >
                    {children}
                  </Theme>
                )}
              >
                <Chapter title={chapter.title} />
              </ConditionalWrap>
            )}
            {sections.map((section, k) => {
              return (
                <Section
                  key={k}
                  section={section}
                  theme={getProjectTheme(section.theme, projectsYaml.themes)}
                />
              )
            })}
          </React.Fragment>
        )
      })}
      <Theme theme={getProjectTheme(next.heroTheme, next.themes)}>
        <Next
          title={next.title}
          tagline={next.tagline}
          fluid={next.hero.childImageSharp.fluid}
          link={next.fields.slug}
        />
      </Theme>
    </Layout>
  )
}

export default Project

export const query = graphql`
  fragment Image on File {
    childImageSharp {
      fluid(maxWidth: 3000) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
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
      content {
        title
        theme
        showTitle
        content {
          sections {
            type
            layout
            theme
            margin
            content {
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
              columns
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
          }
        }
      }
    }
  }
`
