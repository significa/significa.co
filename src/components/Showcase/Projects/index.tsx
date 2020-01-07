import React, { useRef } from 'react'

import { ProjectThumb } from '../../UI'

import * as S from './styled'
import { Project } from '../../../pages/showcase'
import useMeasure from '../../../hooks/useMeasure'
import getThumbBgColor from '../../../utils/getThumbBgColor'

interface Projects {
  projects: Project[]
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

const Projects: React.FC<Projects> = ({ projects }) => {
  return (
    <S.Container>
      {projects.map(project => (
        <ThumbHolder key={project.uid}>
          <ProjectThumb
            title={project.data.project_title}
            tagline={project.data.tagline}
            to={project.url}
            fluid={project.data.thumb_image.fluid}
            services={project.data.services.map(s => s.service)}
            backgroundColor={getThumbBgColor(
              project.data.hero_theme,
              project.data.themes
            )}
          />
        </ThumbHolder>
      ))}
    </S.Container>
  )
}

export default Projects
