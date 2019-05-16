import React from 'react'
import Img from 'gatsby-image'

import { IGallery, IGalleryImage, IGalleryVideo } from '../../types'

import * as S from './styled'

const Gallery: React.FC<IGallery> = ({ items, columns, caption }) => (
  <>
    <S.Wrapper columns={columns}>
      {items.map((item, i) => {
        const imageItem = item as IGalleryImage
        const videoItem = item as IGalleryVideo

        return (
          <S.Item key={i} span={item.span}>
            {imageItem.image && (
              <Img fluid={imageItem.image.childImageSharp.fluid} />
            )}
            {videoItem.video && (
              <video
                width="100%"
                autoPlay
                playsInline
                loop
                muted
                controls={false}
              >
                <source src={videoItem.video.publicURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </S.Item>
        )
      })}
    </S.Wrapper>
    {caption && <S.Caption>{caption}</S.Caption>}
  </>
)

export default Gallery
