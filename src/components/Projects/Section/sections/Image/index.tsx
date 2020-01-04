import React from 'react'

import PrismicImage from '../../../../PrismicImage'

import { ImageType } from '../../types'

import * as S from './styled'

const Image = ({ primary: { image, caption } }: ImageType) => {
  const altProps = image.alt ? { alt: image.alt } : {}
  return (
    <figure>
      <PrismicImage fluid={image.fluid} src={image.url} {...altProps} />
      {caption && <S.Caption>{caption}</S.Caption>}
    </figure>
  )
}

export default Image
