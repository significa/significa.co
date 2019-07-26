import React, { useState } from 'react'
import Img from 'gatsby-image'

import { SlideshowType } from '../../types'

import Arrow from './Arrow'

import * as S from './styled'

const Slideshow: React.FC<SlideshowType> = ({ slideshow_images }) => {
  const [index, setIndex] = useState(0)

  const handleNextSlide = () => {
    setIndex(
      index === slideshow_images.length - 1
        ? slideshow_images.length - 1
        : index + 1
    )
  }

  const handlePrevSlide = () => {
    setIndex(index <= 0 ? 0 : index - 1)
  }

  const translate =
    (index % slideshow_images.length) * (100 / slideshow_images.length)

  return (
    <S.Wrapper>
      <S.SlideWrapper>
        <S.SlideInner
          style={{
            width: slideshow_images.length * 100 + '%',
            transform: `translateX(${-translate}%)`,
          }}
        >
          {slideshow_images.map((item, i) => {
            return (
              <Img
                style={{ width: '100%' }}
                key={i}
                fluid={item.imageSharp.childImageSharp.fluid}
                alt={item.image.alt}
              />
            )
          })}
        </S.SlideInner>
      </S.SlideWrapper>
      <S.Controls>
        <S.Left onClick={handlePrevSlide}>
          <Arrow />
        </S.Left>
        <S.Right onClick={handleNextSlide}>
          <Arrow />
        </S.Right>
      </S.Controls>
    </S.Wrapper>
  )
}

export default Slideshow
