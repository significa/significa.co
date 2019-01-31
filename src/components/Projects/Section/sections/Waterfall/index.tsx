import React from 'react'
import Img from 'gatsby-image'
import Columns from 'react-columns'

import { IWaterfall } from '../../../../../templates/types'

import * as S from './styled'

const Waterfall = (props: IWaterfall) => {
  const columns = [
    {
      columns: 2,
      query: 'min-width: 0',
    },
    {
      columns: 1,
      query: 'max-width: 32em',
    },
  ]

  return (
    <S.Wrapper>
      <Columns queries={columns}>
        {props.items.map((item, i) => (
          <S.ImgHolder key={i}>
            <Img key={i} fluid={item.image.childImageSharp.fluid} />
          </S.ImgHolder>
        ))}
      </Columns>
    </S.Wrapper>
  )
}

export default Waterfall
