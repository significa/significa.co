import React from 'react'
import Img from 'gatsby-image'

import { ImageType } from '../../types'

import * as S from './styled'

const Image = ({ primary: { image, caption } }: ImageType) => {
  const altProps = image.alt ? { alt: image.alt } : {}
  return (
    <figure>
      <Img fluid={image.fluid} {...altProps} />
      {caption && <S.Caption>{caption}</S.Caption>}
    </figure>
  )
}

export default Image
