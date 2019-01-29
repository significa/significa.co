import React from 'react'
import Img from 'gatsby-image'

import {
  ISticky,
  IStickyImage,
  IStickyVideo,
} from '../../../../../templates/types'

import * as S from './styled'
import { textByLine } from '../../../../../utils/textByLine'
import { Text } from '../../../../UI'

const Sticky = (props: ISticky) => {
  const imageItem = props as IStickyImage
  const videoItem = props as IStickyVideo

  return (
    <S.Wrapper inverted={props.invert}>
      <S.TextContainer>
        <S.TextSticky sticky={props.sticky}>
          {props.title && <S.Title>{props.title}</S.Title>}
          {textByLine(props.text).map((line, i) => (
            <Text key={i}>{line}</Text>
          ))}
        </S.TextSticky>
      </S.TextContainer>
      <S.MediaContainer>
        {imageItem.image && (
          <Img fluid={imageItem.image.childImageSharp.fluid} />
        )}
        {videoItem.video && (
          <video width="100%" autoPlay loop muted controls={false}>
            <source src={videoItem.video.publicURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </S.MediaContainer>
    </S.Wrapper>
  )
}

export default Sticky
