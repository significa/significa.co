import React from 'react'

import PrismicImage from '../../../../PrismicImage'
import { ImageType } from '../../types'
import * as S from './styled'

const Image = ({ primary: { image, caption } }: ImageType) => {
  return (
    <figure>
      <PrismicImage
        image={image.childImageSharp.gatsbyImageData}
        alt={image.alt || ''}
        src={image.url}
      />
      {caption && <S.Caption>{caption}</S.Caption>}
    </figure>
  )
}

export default Image
