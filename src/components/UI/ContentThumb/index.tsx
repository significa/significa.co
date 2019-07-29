import React from 'react'
import { FluidObject } from 'gatsby-image'

import { Text } from '../Typography'

import * as S from './styled'

interface IThumb {
  title: string
  to: string
  fluid: FluidObject
  alt?: string
  text: string
  renderIcon?: () => React.ReactNode
}

const ContentThumb: React.FC<IThumb> = ({
  to,
  fluid,
  alt,
  title,
  text,
  renderIcon,
}) => (
  <S.Link to={to}>
    <S.ImgWrapper>
      {typeof renderIcon === 'function' && (
        <S.IconHolder>{renderIcon()}</S.IconHolder>
      )}
      <S.Img fluid={fluid} alt={alt} />
    </S.ImgWrapper>
    <S.Meta>
      <S.Big>{title}</S.Big>
      <Text>{text}</Text>
    </S.Meta>
  </S.Link>
)

export default ContentThumb
