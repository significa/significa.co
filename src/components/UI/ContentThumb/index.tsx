import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import { Text } from '../Typography'
import * as S from './styled'

interface IThumb {
  title: string
  to: string
  image: IGatsbyImageData
  alt: string
  text: string
  renderIcon?: () => React.ReactNode
  showShadow?: boolean
  backgroundColor?: string
}

const ContentThumb: React.FC<IThumb> = ({
  to,
  image,
  alt,
  title,
  text,
  renderIcon,
  showShadow,
  backgroundColor,
}) => {
  const bgColorProps = backgroundColor ? { backgroundColor } : {}

  return (
    <S.Link to={to}>
      <S.ImgWrapper>
        {typeof renderIcon === 'function' && (
          <S.IconHolder>{renderIcon()}</S.IconHolder>
        )}
        <S.Img image={image} alt={alt} {...bgColorProps} />
        {showShadow && (
          <S.BlurImg image={image} alt={alt} style={{ position: 'absolute' }} />
        )}
      </S.ImgWrapper>
      <S.Meta>
        <S.Big>{title}</S.Big>
        <Text>{text}</Text>
      </S.Meta>
    </S.Link>
  )
}

export default ContentThumb
