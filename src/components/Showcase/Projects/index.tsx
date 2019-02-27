import React, { useRef } from 'react'

import { ProjectThumb } from '../../UI'

import * as S from './styled'
import { IProject } from '../../../pages/showcase'
import useMeasure from '../../../hooks/useMeasure'

interface IProjects {
  projects: IProject[]
}

const ThumbHolder: React.FC<{}> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { height } = useMeasure(ref, 'a')
  const rowSpan = Math.ceil(height / 4)

  return (
    <S.Holder ref={ref} rowSpan={rowSpan}>
      {children}
    </S.Holder>
  )
}

const Projects: React.FC<IProjects> = ({ projects }) => {
  return (
    <S.Container>
      {projects.map(({ node: project }) => (
        <ThumbHolder key={project.id}>
          <ProjectThumb
            title={project.title}
            tagline={project.tagline}
            to={project.fields.slug}
            fluid={project.thumbnail.childImageSharp.fluid}
            services={project.services}
          />
        </ThumbHolder>
      ))}
    </S.Container>
  )
}

export default Projects
