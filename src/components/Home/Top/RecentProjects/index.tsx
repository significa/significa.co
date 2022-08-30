import { motion } from 'framer-motion'
import { graphql, StaticQuery } from 'gatsby'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import getThumbBgColor from '../../../../utils/getThumbBgColor'
import { ProjectThumb } from '../../../UI'
import * as S from './styled'

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
          gatsbyImageData: IGatsbyImageData
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
                // TODO: change alt to a proper one
                alt="Project Thumb"
                image={project.data.thumb_image.gatsbyImageData}
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
        uid
        data {
          hero_theme
          themes {
            name
            background
          }
          thumb_image {
            alt
            gatsbyImageData
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
