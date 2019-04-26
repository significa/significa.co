import React from 'react'
import Img from 'gatsby-image'

import { IWaterfall } from '../../types'

import * as S from './styled'

const Waterfall = (props: IWaterfall) => {
  return (
    <S.Wrapper>
      {props.items.map((item, i) => {
        const { height } = item.image.childImageSharp.resize
        const rowSpan = Math.ceil(height / 10)

        return (
          <S.ImgHolder key={i} index={i} rowSpan={rowSpan}>
            <Img key={i} fluid={item.image.childImageSharp.fluid} />
          </S.ImgHolder>
        )
      })}
    </S.Wrapper>
  )
}

export default Waterfall
