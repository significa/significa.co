import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { ProjectThumb } from '../UI/'

import * as S from './styled'
import linkResolver from '../../utils/linkResolver'

interface IRecentProjectsData {
  prismic: {
    allProjects: {
      edges: Array<{
        node: {
          _meta: {
            uid: string
            type: string
          }
          project_title: string
          tagline: string
          services: Array<{
            service: string
          }>
          thumb_imageSharp: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
        }
      }>
    }
  }
}

const RecentProjects = () => (
  <StaticQuery
    query={recentProjectsQuery}
    render={(data: IRecentProjectsData) => {
      const { edges: projects } = data.prismic.allProjects

      return (
        <S.Container>
          {projects.map(({ node: project }) => (
            <ProjectThumb
              key={project._meta.uid}
              title={project.project_title}
              tagline={project.tagline}
              to={linkResolver(project._meta)}
              fluid={project.thumb_imageSharp.childImageSharp.fluid}
              services={project.services.map(s => s.service)}
              limitServices
            />
          ))}
        </S.Container>
      )
    }}
  />
)

const recentProjectsQuery = graphql`
  query RecentProjectsQuery {
    prismic {
      allProjects(sortBy: meta_firstPublicationDate_DESC, first: 3) {
        edges {
          node {
            _meta {
              uid
              type
            }
            project_title
            tagline
            services {
              service
            }
            thumb_image
            thumb_imageSharp {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

export default RecentProjects
