import React from 'react'
import Img from 'gatsby-image'

import {
  IGallery,
  IGalleryImage,
  IGalleryVideo,
} from '../../../../../templates/types'

import * as S from './styled'

const Gallery: React.FC<IGallery> = ({ items, caption }) => (
  <>
    <S.Wrapper>
      {items.map((item, i) => {
        const imageItem = item as IGalleryImage
        const videoItem = item as IGalleryVideo

        return (
          <S.Item key={i} span={item.span}>
            {imageItem.image && (
              <Img fluid={imageItem.image.childImageSharp.fluid} />
            )}
            {videoItem.video && <div>{videoItem.video.publicURL}</div>}
          </S.Item>
        )
      })}
    </S.Wrapper>
    {caption && <S.Caption>{caption}</S.Caption>}
  </>
)

export default Gallery
