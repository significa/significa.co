import React, { ReactNode, useRef } from 'react'

import useMeasure from '../../../hooks/useMeasure'
import { Project } from '../../../pages/showcase'
import getThumbBgColor from '../../../utils/getThumbBgColor'
import { ProjectThumb } from '../../UI'
import * as S from './styled'

interface Projects {
  projects: Project[]
}

const ThumbHolder: React.FC<{ children?: ReactNode }> = ({ children }) => {
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
      {projects.map((project, _index) => (
        <ThumbHolder key={project.uid}>
          <ProjectThumb
            title={project.data.project_title}
            tagline={project.data.tagline}
            to={project.url}
            alt={project.data.thumb_image.alt}
            image={project.data.thumb_image.gatsbyImageData}
            services={project.data.services.map((s, _index) => s.service)}
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
