import { graphql } from 'gatsby'
import React, { useRef } from 'react'

import { Theme } from '@theme'

import Layout from '../components/Layout'
import { Meta, Hero, Section, Next, Navigation } from '../components/Projects'
import SEO from '../components/SEO'
import ConditionalWrap from '../components/utils/ConditionalWrap'
import { getProjectTheme } from '../utils/getProjectTheme'
import { IProject } from './project.types'

interface IProjectProps {
  data: {
    prismicProject: {
      data: IProject
    }
  }
}

const ProjectPage = ({ data }: IProjectProps) => {
  // const preview = typeof window !== 'undefined' && window.__PRISMIC_PREVIEW__

  // const data: IProjectProps['data'] = mergePrismicPreviewData({
  //   staticData,
  //   previewData: preview,
  // })

  const { data: project } = data.prismicProject

  // Someplace to save the section name
  const sectionName = useRef<string>('')

  if (!project) {
    return null
  }

  return (
    <Layout
      theme={getProjectTheme(project.main_theme, project.themes)}
      headerTheme={getProjectTheme(project.hero_theme, project.themes)}
      footerTheme="light"
    >
      <SEO
        title={project.seo_title}
        description={project.seo_description}
        titleTemplate="%s"
        image={project.seo_og_image.url}
      />

      <div>
        {/* Hero */}
        <Theme theme={getProjectTheme(project.hero_theme, project.themes)}>
          <Hero
            title={project.project_title}
            tagline={project.tagline}
            image={project.hero_image.gatsbyImageData}
            src={project.hero_image.url}
          />
        </Theme>

        {/* Project description */}
        <Meta
          description={project.description}
          client={project.client}
          services={project.services.map((s: { service: string }) => s.service)}
          deliverables={project.deliverables.map(
            (d: { deliverable: string }) => d.deliverable
          )}
          links={project.links.map(
            (l: { link: { url: string }; link_text: string }) => ({
              link: l.link.url,
              linkText: l.link_text,
            })
          )}
        />

        {/* Navigation */}
        <ConditionalWrap
          condition={!!project.navigation_theme}
          wrap={(children: any) => (
            <Theme
              theme={getProjectTheme(project.navigation_theme, project.themes)}
            >
              {children}
            </Theme>
          )}
        >
          <Navigation content={project.body} />
        </ConditionalWrap>

        {/* Content */}
        {project.body.map((section, i) => {
          if (section.slice_type === 'section') {
            sectionName.current = section.primary.title
          }

          return (
            <Section
              key={i}
              section={section}
              sectionLabel={sectionName.current}
              themes={project.themes}
            />
          )
        })}

        {/* Next  project */}
        <Theme
          theme={getProjectTheme(
            project.next_project.document.data.hero_theme,
            project.next_project.document.data.themes
          )}
        >
          <Next
            title={project.next_project.document.data.project_title}
            tagline={project.next_project.document.data.tagline}
            link={project.next_project.document.url}
          />
        </Theme>
      </div>
    </Layout>
  )
}

export default ProjectPage

// eslint-disable-next-line prettier/prettier -- false error
export const query = graphql`
  query($uid: String!) {
    prismicProject(uid: { eq: $uid }) {
      data {
        ...ProjectThemes
        ...ProjectSEO
        ...ProjectHero
        ...ProjectMeta
        ...NextProject
        body {
          ... on PrismicProjectDataBodyChapter {
            ...BodyChapter
          }
          ... on PrismicProjectDataBodySection {
            ...BodySection
          }
          ... on PrismicProjectDataBodyText {
            ...BodyText
          }
          ... on PrismicProjectDataBodyImage {
            ...BodyImage
          }
          ... on PrismicProjectDataBodyVideo {
            ...BodyVideo
          }
          ... on PrismicProjectDataBodyImageGallery {
            ...BodyImageGallery
          }
          ... on PrismicProjectDataBodyComparison {
            ...BodyComparison
          }
          ... on PrismicProjectDataBodySlideshow {
            ...BodySlideshow
          }
          ... on PrismicProjectDataBodyWaterfall {
            ...BodyWaterfall
          }
          ... on PrismicProjectDataBodyTestimonial {
            ...BodyTestimonial
          }
          ... on PrismicProjectDataBodyEmbed {
            ...BodyEmbed
          }
          ... on PrismicProjectDataBodyHighlight {
            ...BodyHighlight
          }
          ... on PrismicProjectDataBodyStickyImage {
            ...BodyStickyImage
          }
          ... on PrismicProjectDataBodyStickyVideo {
            ...BodyStickyVideo
          }
        }
      }
    }
  }
`
