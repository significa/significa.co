import React from 'react'
import Img from 'gatsby-image'
import Columns from 'react-columns'

import { IWaterfall } from '../../types'

import * as S from './styled'

/**
 * THIS SECTION NEEDS TO BE REDONE!
 *
 * We shouldn't rely on external packages for this
 * (expect maybe for snuggle that's not `external` per-se)
 *
 * - Remove `react-columns`
 * - Remove definition from '/src/modules.d.ts`
 * - Write some quality code
 */

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
