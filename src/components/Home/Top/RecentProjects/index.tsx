import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { motion } from 'framer-motion'

import { ProjectThumb } from '../../../UI'

import * as S from './styled'
import getThumbBgColor from '../../../../utils/getThumbBgColor'

interface IRecentProjectsData {
  allPrismicProject: {
    nodes: Array<{
      url: string
      uid: string
      data: {
        hero_theme: string
        themes: Array<{ name: string; background: string }>
        project_title: string
        tagline: string
        services: Array<{
          service: string
        }>
        thumb_image: {
          alt: string
          fluid: FluidObject
        }
      }
    }>
  }
}

const RecentProjects = () => (
  <StaticQuery
    query={recentProjectsQuery}
    render={(data: IRecentProjectsData) => {
      const { nodes: projects } = data.allPrismicProject

      return (
        <S.Container>
          {projects.map((project, i) => (
            <motion.div
              key={project.uid}
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
            >
              <ProjectThumb
                title={project.data.project_title}
                tagline={project.data.tagline}
                to={project.url}
                fluid={project.data.thumb_image.fluid}
                services={project.data.services.map(s => s.service)}
                limitServices
                backgroundColor={getThumbBgColor(
                  project.data.hero_theme,
                  project.data.themes
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
    allPrismicProject(
      sort: { fields: first_publication_date, order: DESC }
      limit: 3
    ) {
      nodes {
        url
        uid
        data {
          hero_theme
          themes {
            name
            background
          }
          thumb_image {
            alt
            fluid(maxWidth: 500) {
              ...GatsbyPrismicImageFluid_noBase64
            }
          }
          project_title
          tagline
          services {
            service
          }
        }
      }
    }
  }
`

export default RecentProjects
