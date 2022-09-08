import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import ContentThumb from '../ContentThumb'
import LabsIcon from '../LabsIcon'
import { LabsSourceType } from '../LabsIcon/types'

interface ILabsThumb {
  title: string
  tagline: string
  to: string
  image: IGatsbyImageData
  alt: string
  more: string
  source: LabsSourceType
}

const LabsThumb: React.FC<ILabsThumb> = ({
  to,
  image,
  alt,
  title,
  tagline,
  more,
  source,
}) => (
  <ContentThumb
    to={to}
    image={image}
    alt={alt}
    title={`${title} — ${tagline}`}
    text={more}
    renderIcon={() => <LabsIcon source={source} color />}
  />
)

export default LabsThumb
