import React from 'react'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import ContentThumb from '../ContentThumb'

interface IProjectThumb {
  title: string
  tagline: string
  to: string
  alt: string
  image: IGatsbyImageData
  services: string[]
  limitServices?: boolean
  backgroundColor?: string
}

const ProjectThumb: React.FC<IProjectThumb> = ({
  to,
  alt,
  image,
  title,
  tagline,
  services,
  limitServices,
  backgroundColor,
}) => (
  <ContentThumb
    to={to}
    alt={alt}
    image={image}
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
