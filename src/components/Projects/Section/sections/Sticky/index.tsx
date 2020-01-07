import React from 'react'

import Img from '../../../../PrismicImage'

import { StickyImageType, StickyVideoType } from '../../types'
import { navigateToSection } from '../../../utils'
import * as S from './styled'
import { textByLine } from '../../../../../utils/textByLine'
import { titleToID } from '../../../../../utils/titleToID'
import { Text } from '../../../../UI'

type StickySection = StickyImageType | StickyVideoType

type StickyProps = StickySection & {
  sectionLabel: string
}

const Sticky = (props: StickyProps) => {
  const { primary: section } = props

  const id = section.title ? titleToID(section.title) : undefined

  return (
    <S.Wrapper inverted={section.invert === 'true'} id={id}>
      <S.TextContainer>
        <S.TextSticky sticky={section.is_sticky === 'true'}>
          {section.title && props.sectionLabel && (
            <S.Label>{props.sectionLabel}</S.Label>
          )}

          {section.title && (
            <S.TitleWrapper
              href={`#${id}`}
              onClick={e => navigateToSection(e, id as string)}
            >
              <S.AnchorIcon />
              <S.Title>{section.title}</S.Title>
            </S.TitleWrapper>
          )}

          {textByLine(section.text).map((line, i) => (
            <Text key={i}>{line}</Text>
          ))}
        </S.TextSticky>
      </S.TextContainer>
      <S.MediaContainer>
        {'image' in section && (
          <Img
            src={section.image.url}
            fluid={section.image.fluid}
            alt={section.image.alt}
          />
        )}
        {'video' in section && (
          <video width="100%" autoPlay playsInline loop muted controls={false}>
            <source src={section.video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </S.MediaContainer>
    </S.Wrapper>
  )
}

export default Sticky
