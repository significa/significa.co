import React from 'react'
import { graphql } from 'gatsby'

import { Theme, IColorsTheme } from '@theme'

import { getProjectTheme } from '../utils/getProjectTheme'
import { IImageObject, ISection } from '../components/Projects/Section/types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {
  Meta,
  Hero,
  Section,
  Next,
  Chapter,
  Navigation,
} from '../components/Projects/'
import ConditionalWrap from '../components/utils/ConditionalWrap'

interface ITheme extends IColorsTheme {
  name: string
}

export type ContentType = Array<{
  title?: string
  theme?: string
  showTitle?: boolean
  content: Array<{
    title?: string
    sections: ISection[]
  }>
}>

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
      seo: {
        title: string
        description: string
      }
      title: string
      tagline: string
      description: string
      hero: IImageObject
      shareImage: {
        childImageSharp: { resize: { src: string } }
      }
      heroTheme: string
      mainTheme: string
      navigationTheme: string
      themes?: ITheme[]
      client?: string
      services?: string[]
      deliverables?: string[]
      links?: Array<{
        link: string
        linkText: string
      }>
      content: ContentType
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
      <SEO
        title={projectsYaml.seo.title}
        description={projectsYaml.seo.description}
        titleTemplate="%s"
        image={projectsYaml.shareImage.childImageSharp.resize.src}
      />

      {/* Project navigation */}
      <ConditionalWrap
        condition={!!projectsYaml.navigationTheme}
        wrap={children => (
          <Theme
            theme={getProjectTheme(
              projectsYaml.navigationTheme as string,
              projectsYaml.themes
            )}
          >
            {children}
          </Theme>
        )}
      >
        <Navigation content={projectsYaml.content} />
      </ConditionalWrap>

      <div>
        {/* Hero */}
        <Theme
          theme={getProjectTheme(projectsYaml.heroTheme, projectsYaml.themes)}
        >
          <Hero
            title={projectsYaml.title}
            tagline={projectsYaml.tagline}
            fluid={projectsYaml.hero.childImageSharp.fluid}
          />
        </Theme>

        {/* Project description */}
        <Meta
          description={projectsYaml.description}
          client={projectsYaml.client}
          services={projectsYaml.services}
          deliverables={projectsYaml.deliverables}
          links={projectsYaml.links}
        />

        {/* Chapters, blocks and sections */}
        {projectsYaml.content.map((chapter, chapterIndex) => {
          return (
            <React.Fragment key={chapterIndex}>
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
              {chapter.content.map(block => {
                return block.sections.map((section, sectionIndex) => {
                  return (
                    <Section
                      key={sectionIndex}
                      section={section}
                      theme={getProjectTheme(
                        section.theme,
                        projectsYaml.themes
                      )}
                      sectionLabel={block.title}
                    />
                  )
                })
              })}
            </React.Fragment>
          )
        })}

        {/* Next  project */}
        <Theme theme={getProjectTheme(next.heroTheme, next.themes)}>
          <Next
            title={next.title}
            tagline={next.tagline}
            link={next.fields.slug}
          />
        </Theme>
      </div>
    </Layout>
  )
}

export default Project

export const query = graphql`
  fragment Image on File {
    childImageSharp {
      fluid(maxWidth: 3000) {
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
      resize {
        height
      }
    }
  }

  query($slug: String!) {
    projectsYaml(fields: { slug: { eq: $slug } }) {
      seo {
        title
        description
      }
      title
      tagline
      description
      hero {
        ...Image
      }
      shareImage: hero {
        childImageSharp {
          resize(width: 1200, height: 600) {
            src
          }
        }
      }
      heroTheme
      mainTheme
      navigationTheme
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
          title
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
