import React, { useRef } from 'react'

import { ProjectThumb } from '../../UI'

import * as S from './styled'
import { IProject } from '../../../pages/showcase'
import useMeasure from '../../../hooks/useMeasure'
import linkResolver from '../../../utils/linkResolver'
import getThumbBgColor from '../../../utils/getThumbBgColor'

interface IProjects {
  projects: IProject[]
}

const ThumbHolder: React.FC<{}> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { height } = useMeasure(ref, 'a')
  const rowSpan = Math.ceil(height / 4)

  return (
    <S.Holder ref={ref} rowAmount={rowSpan}>
      {children}
    </S.Holder>
  )
}

const Projects: React.FC<IProjects> = ({ projects }) => {
  return (
    <S.Container>
      {projects.map(({ node: project }) => (
        <ThumbHolder key={project._meta.uid}>
          <ProjectThumb
            title={project.project_title}
            tagline={project.tagline}
            to={linkResolver(project._meta)}
            fluid={project.thumb_imageSharp.childImageSharp.fluid}
            services={project.services.map(s => s.service)}
            backgroundColor={getThumbBgColor(
              project.hero_theme,
              project.themes
            )}
          />
        </ThumbHolder>
      ))}
    </S.Container>
  )
}

export default Projects
