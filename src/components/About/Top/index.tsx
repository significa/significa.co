import React from 'react'
import Img, { FluidObject } from 'gatsby-image'

import * as S from './styled'

interface ITop {
  title: string
  photos: Array<{
    alt: string
    image: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }>
}

const Top: React.FC<ITop> = ({ title, photos }) => {
  return (
    <>
      <S.TopWrapper>
        <S.Huge>{title}</S.Huge>
      </S.TopWrapper>
      <S.Gallery>
        {photos.map(({ image, alt }) => (
          <div key={alt}>
            <Img alt={alt} fluid={image.childImageSharp.fluid} />
          </div>
        ))}
      </S.Gallery>
    </>
  )
}

export default Top
