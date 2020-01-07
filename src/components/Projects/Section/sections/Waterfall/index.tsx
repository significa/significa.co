import React from 'react'

import Img from '../../../../PrismicImage'

import { WaterfallType } from '../../types'

import * as S from './styled'

const Waterfall = (props: WaterfallType) => {
  return (
    <S.Wrapper>
      {props.items.map((item, i) => {
        const { height } = item.image.dimensions
        const rowSpan = Math.ceil(height / 10)

        return (
          <S.ImgHolder key={i} index={i} rowSpan={rowSpan}>
            <Img
              key={i}
              fluid={item.image.fluid}
              alt={item.image.alt}
              src={item.image.url}
            />
          </S.ImgHolder>
        )
      })}
    </S.Wrapper>
  )
}

export default Waterfall
