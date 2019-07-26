import React from 'react'
import { FluidObject } from 'gatsby-image'

import ContentThumb from '../ContentThumb'
import LabsIcon from '../LabsIcon'
import { LabsSourceType } from '../LabsIcon/types'

interface ILabsThumb {
  title: string
  tagline: string
  to: string
  fluid: FluidObject
  alt?: string
  more: string
  source: LabsSourceType
}

const LabsThumb: React.FC<ILabsThumb> = ({
  to,
  fluid,
  alt,
  title,
  tagline,
  more,
  source,
}) => (
  <ContentThumb
    to={to}
    fluid={fluid}
    alt={alt}
    title={`${title} — ${tagline}`}
    text={more}
    renderIcon={() => <LabsIcon source={source} color />}
  />
)

export default LabsThumb
