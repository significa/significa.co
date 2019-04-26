import React from 'react'
import { FluidObject } from 'gatsby-image'

import ContentThumb from '../ContentThumb'

interface IProjectThumb {
  title: string
  tagline: string
  to: string
  fluid: FluidObject
  services: string[]
}

const ProjectThumb: React.FC<IProjectThumb> = ({
  to,
  fluid,
  title,
  tagline,
  services,
}) => (
  <ContentThumb
    to={to}
    fluid={fluid}
    title={`${title} — ${tagline}`}
    text={services.join(', ')}
  />
)

export default ProjectThumb
