import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'

import styled, { IColorsTheme, Theme } from '@theme'

import Layout from '../Layout'
import SEO from '../components/SEO'
import { Hero } from '../components/Projects/Hero'
import { Meta } from '../components/Projects/Meta'

import { getProjectTheme } from '../utils/getProjectTheme'

interface ITheme extends IColorsTheme {
  name: string
}

interface IProject {
  data: {
    projectsYaml: {
      title: string
      tagline: string
      description: string
      hero: {
        childImageSharp: {
          fluid: FluidObject
        }
      }
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
    }
  }
}

const ProjectWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`

const Project = ({ data }: IProject) => {
  const { projectsYaml: content } = data

  return (
    <Layout
      footerWhite
      theme={getProjectTheme(content.heroTheme, content.themes)}
    >
      <SEO title={content.title} description={content.description} />
      <Hero
        title={content.title}
        tagline={content.tagline}
        fluid={content.hero.childImageSharp.fluid}
      />
      <Theme theme={getProjectTheme(content.mainTheme, content.themes)}>
        <ProjectWrapper>
          <Meta
            description={content.description}
            client={content.client}
            services={content.services}
            deliverables={content.deliverables}
            links={content.links}
          />
        </ProjectWrapper>
      </Theme>
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
    }
  }
`
