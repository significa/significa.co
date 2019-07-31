import React from 'react'
import { FluidObject } from 'gatsby-image'

import ContentThumb from '../ContentThumb'

interface IProjectThumb {
  title: string
  tagline: string
  to: string
  fluid: FluidObject
  services: string[]
  limitServices?: boolean
  backgroundColor?: string
}

const ProjectThumb: React.FC<IProjectThumb> = ({
  to,
  fluid,
  title,
  tagline,
  services,
  limitServices,
  backgroundColor,
}) => (
  <ContentThumb
    to={to}
    fluid={fluid}
    title={`${title} — ${tagline}`}
    showShadow
    backgroundColor={backgroundColor}
    text={
      limitServices && services.length > 5
        ? services.slice(0, 3).join(', ') + ` & ${services.length - 3} others`
        : services.join(', ')
    }
  />
)

export default ProjectThumb
