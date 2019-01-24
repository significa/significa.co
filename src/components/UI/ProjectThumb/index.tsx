import React from 'react'
import { FluidObject } from 'gatsby-image'

import { Text } from '../Typography'

import * as S from './styled'

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
  <S.Link to={to}>
    <S.ImgWrapper>
      <S.Img fluid={fluid} />
    </S.ImgWrapper>
    <S.Meta>
      <S.Big>
        {title} &mdash; {tagline}
      </S.Big>
      <Text>{services.join(', ')}</Text>
    </S.Meta>
  </S.Link>
)

export default ProjectThumb
