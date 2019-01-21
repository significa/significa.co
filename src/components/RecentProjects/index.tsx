import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { ProjectThumb } from '../UI/ProjectThumb'

import * as S from './styled'

interface IRecentProjectsData {
  allProjectsYaml: {
    edges: Array<{
      node: {
        id: string
        title: string
        tagline: string
        slug: string
        services: string[]
        thumbnail: {
          childImageSharp: {
            fluid: FluidObject
          }
        }
      }
    }>
  }
}

const RecentProjects = () => (
  <StaticQuery
    query={recentProjectsQuery}
    render={(data: IRecentProjectsData) => {
      const { edges: projects } = data.allProjectsYaml

      return (
        <S.Container>
          {projects.map(({ node: project }) => (
            <ProjectThumb
              key={project.id}
              title={project.title}
              tagline={project.tagline}
              to={`/projects/${project.slug}`}
              fluid={project.thumbnail.childImageSharp.fluid}
              services={project.services}
            />
          ))}
        </S.Container>
      )
    }}
  />
)

const recentProjectsQuery = graphql`
  query RecentProjectsQuery {
    allProjectsYaml(limit: 3, sort: { fields: date }) {
      edges {
        node {
          id
          title
          tagline
          slug
          services
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

export { RecentProjects }
