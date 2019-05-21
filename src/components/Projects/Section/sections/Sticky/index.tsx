import React from 'react'
import Img from 'gatsby-image'

import { ISticky, IStickyImage, IStickyVideo } from '../../types'
import { navigateToSection } from '../../../utils'
import * as S from './styled'
import { textByLine } from '../../../../../utils/textByLine'
import { titleToID } from '../../../../../utils/titleToID'
import { Text } from '../../../../UI'

const Sticky = (props: ISticky) => {
  const imageItem = props as IStickyImage
  const videoItem = props as IStickyVideo
  const id = props.title ? titleToID(props.title) : undefined

  return (
    <S.Wrapper inverted={props.invert}>
      <S.TextContainer>
        <S.TextSticky sticky={props.sticky}>
          {props.title && props.sectionLabel && (
            <S.Label>{props.sectionLabel}</S.Label>
          )}

          {props.title && (
            <S.TitleWrapper
              href={`#${id}`}
              onClick={e => navigateToSection(e, id as string)}
            >
              <S.AnchorIcon />
              <S.Title>{props.title}</S.Title>
            </S.TitleWrapper>
          )}

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
          <video width="100%" autoPlay playsInline loop muted controls={false}>
            <source src={videoItem.video.publicURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </S.MediaContainer>
    </S.Wrapper>
  )
}

export default Sticky
