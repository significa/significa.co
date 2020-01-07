import React, { useState } from 'react'

import Img from '../../../../PrismicImage'

import { SlideshowType } from '../../types'

import Arrow from './Arrow'

import * as S from './styled'

const Slideshow: React.FC<SlideshowType> = ({ items }) => {
  const [index, setIndex] = useState(0)

  const handleNextSlide = () => {
    setIndex(index === items.length - 1 ? items.length - 1 : index + 1)
  }

  const handlePrevSlide = () => {
    setIndex(index <= 0 ? 0 : index - 1)
  }

  const translate = (index % items.length) * (100 / items.length)

  return (
    <S.Wrapper>
      <S.SlideWrapper>
        <S.SlideInner
          style={{
            width: items.length * 100 + '%',
            transform: `translateX(${-translate}%)`,
          }}
        >
          {items.map((item, i) => {
            return (
              <Img
                style={{ width: '100%' }}
                key={i}
                fluid={item.image.fluid}
                src={item.image.url}
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
