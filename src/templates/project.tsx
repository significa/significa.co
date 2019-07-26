import React from 'react'
import { graphql } from 'gatsby'
import { Theme } from '@theme'

import linkResolver from '../utils/linkResolver'
import { getProjectTheme } from '../utils/getProjectTheme'
import { IProject } from './project.types'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Meta, Hero, Section, Next, Navigation } from '../components/Projects'

interface IProjectProps {
  data: {
    prismic: {
      project: IProject
    }
  }
}

const TestPage = ({ data }: IProjectProps) => {
  const { project } = data.prismic
  // Someplace to save the section name
  const sectionName = React.useRef('')

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
            fluid={project.hero_imageSharp.childImageSharp.fluid}
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

        {/* Content */}
        <Navigation content={project.body} />

        {/* Content */}
        {project.body.map((section, i) => {
          if (section.type === 'section' && section.section) {
            sectionName.current = section.section.title
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
            project.next_project.hero_theme,
            project.next_project.themes
          )}
        >
          <Next
            title={project.next_project.project_title}
            tagline={project.next_project.tagline}
            link={linkResolver(project.next_project._meta)}
          />
        </Theme>
      </div>
    </Layout>
  )
}

export default TestPage

export const query = graphql`
  query($uid: String!) {
    prismic {
      project(lang: "en-gb", uid: $uid) {
        ...ProjectFragment
      }
    }
  }
`
