import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { motion } from 'framer-motion'

import { ProjectThumb } from '../../../UI'

import * as S from './styled'
import linkResolver from '../../../../utils/linkResolver'
import getThumbBgColor from '../../../../utils/getThumbBgColor'

interface IRecentProjectsData {
  prismic: {
    allProjects: {
      edges: Array<{
        node: {
          _meta: {
            uid: string
            type: string
          }
          hero_theme: string
          themes: Array<{ name: string; background: string }>
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
          {projects.map(({ node: project }, i) => (
            <motion.div
              key={project._meta.uid}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: (i + 1) / 10,
              }}
            >
              <ProjectThumb
                title={project.project_title}
                tagline={project.tagline}
                to={linkResolver(project._meta)}
                fluid={project.thumb_imageSharp.childImageSharp.fluid}
                services={project.services.map(s => s.service)}
                limitServices
                backgroundColor={getThumbBgColor(
                  project.hero_theme,
                  project.themes
                )}
              />
            </motion.div>
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
            hero_theme
            themes {
              name
              background
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
