import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { ProjectThumb } from '../UI/'

import * as S from './styled'

interface IRecentProjectsData {
  allProjectsYaml: {
    edges: Array<{
      node: {
        fields: {
          slug: string
        }
        id: string
        title: string
        tagline: string
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
              to={project.fields.slug}
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
    allProjectsYaml(
      limit: 3
      sort: { fields: date }
      filter: { published: { ne: false } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          id
          title
          tagline
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

export default RecentProjects
