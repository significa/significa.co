import React from 'react'
import Img from 'gatsby-image'

import { WaterfallType } from '../../types'

import * as S from './styled'

const Waterfall = (props: WaterfallType) => {
  return (
    <S.Wrapper>
      {props.waterfall_images.map((item, i) => {
        const { height } = item.imageSharp.childImageSharp.resize
        const rowSpan = Math.ceil(height / 10)

        return (
          <S.ImgHolder
            key={`${item.image.alt}-${i}`}
            index={i}
            rowSpan={rowSpan}
          >
            <Img
              fluid={item.imageSharp.childImageSharp.fluid}
              alt={item.image.alt}
            />
          </S.ImgHolder>
        )
      })}
    </S.Wrapper>
  )
}

export default Waterfall
