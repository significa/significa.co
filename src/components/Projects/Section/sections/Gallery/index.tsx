import React from 'react'
import Img from 'gatsby-image'

import { GalleryType } from '../../types'

import * as S from './styled'

const Gallery: React.FC<GalleryType> = props => (
  <>
    <S.Wrapper columns={props.primary.columns}>
      {props.items.map((image, i) => {
        return (
          <S.Item
            key={i}
            span={{
              desktop: image.span,
              tablet: image.span_tablet,
              mobile: image.span_mobile,
            }}
          >
            <Img fluid={image.image.fluid} alt={image.image.alt} />
          </S.Item>
        )
      })}
    </S.Wrapper>
    {props.primary.caption && <S.Caption>{props.primary.caption}</S.Caption>}
  </>
)

export default Gallery
