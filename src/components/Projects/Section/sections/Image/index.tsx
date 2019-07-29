import React from 'react'
import Img from 'gatsby-image'

import { ImageType } from '../../types'

import * as S from './styled'

const Image = ({ image: { image, imageSharp, caption } }: ImageType) => {
  const altProps = image.alt ? { alt: image.alt } : {}
  return (
    <figure>
      <Img fluid={imageSharp.childImageSharp.fluid} {...altProps} />
      {caption && <S.Caption>{caption}</S.Caption>}
    </figure>
  )
}

export default Image
