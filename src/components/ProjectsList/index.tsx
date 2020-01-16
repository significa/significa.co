import { motion } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import React from 'react'

import useMeasure from '../../hooks/useMeasure'
import getThumbBgColor from '../../utils/getThumbBgColor'
import { ProjectThumb } from '../UI'
import * as S from './styled'

type ProjectsListData = {
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

type ProjectsListProps = {
  animate?: boolean
  delay?: number
  limit?: number
  columns?: number
}

const SPRING_TRANSITION = {
  type: 'spring',
  damping: 18,
  stiffness: 200,
}

const ThumbHolder: React.FC<{}> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const { height } = useMeasure(ref, 'a')
  const rowSpan = Math.ceil(height / 4)

  return (
    <S.Holder ref={ref} rowAmount={rowSpan}>
      {children}
    </S.Holder>
  )
}

const ProjectsList: React.FC<ProjectsListProps> = ({
  animate = true,
  delay = 0,
  limit,
  columns = 2,
}) => {
  const data = useStaticQuery<ProjectsListData>(projectsQuery)

  const { nodes } = data.allPrismicProject
  const projects = limit ? nodes.slice(0, limit) : nodes

  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.2,
          },
        },
      }}
      initial={animate ? 'hidden' : 'show'}
      animate="show"
    >
      <S.Container columns={columns}>
        {projects.map(project => (
          <ThumbHolder key={project.uid}>
            <motion.div
              key={project.uid}
              variants={{
                hidden: { y: 75, opacity: 0, transition: SPRING_TRANSITION },
                show: { y: 0, opacity: 1, transition: SPRING_TRANSITION },
              }}
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
          </ThumbHolder>
        ))}
      </S.Container>
    </motion.div>
  )
}

const projectsQuery = graphql`
  query ProjectsListQuery {
    allPrismicProject(sort: { fields: first_publication_date, order: DESC }) {
      nodes {
        url
        uid
        data {
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
          thumb_image {
            alt
            fluid(maxWidth: 500) {
              ...GatsbyPrismicImageFluid_noBase64
            }
          }
        }
      }
    }
  }
`

export default ProjectsList
