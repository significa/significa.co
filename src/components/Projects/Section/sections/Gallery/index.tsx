import React from 'react'
import Img from 'gatsby-image'

import { GalleryType } from '../../types'

import * as S from './styled'

const Gallery: React.FC<GalleryType> = props => (
  <>
    <S.Wrapper columns={props.image_gallery.columns}>
      {props.image_gallery_images.map((image, i) => {
        return (
          <S.Item
            key={i}
            span={{
              desktop: image.span,
              tablet: image.span_tablet,
              mobile: image.span_mobile,
            }}
          >
            <Img
              fluid={image.imageSharp.childImageSharp.fluid}
              alt={image.image.alt}
            />
          </S.Item>
        )
      })}
    </S.Wrapper>
    {props.image_gallery.caption && (
      <S.Caption>{props.image_gallery.caption}</S.Caption>
    )}
  </>
)

export default Gallery
