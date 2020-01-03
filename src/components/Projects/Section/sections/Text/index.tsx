import React from 'react'

import { TextType } from '../../types'

import * as S from './styled'
import { textByLine } from '../../../../../utils/textByLine'
import { Text as TypographyText } from '../../../../UI'
import { titleToID } from '../../../../../utils/titleToID'
import { navigateToSection } from '../../../utils'

interface ITextProps extends TextType {
  sectionLabel?: string
}

const Text = ({ primary: text, sectionLabel }: ITextProps) => {
  const id = text.title ? titleToID(text.title) : undefined

  return (
    <S.Wrapper id={id}>
      {text.title && sectionLabel && <S.Label>{sectionLabel}</S.Label>}
      {text.title && (
        <S.TitleWrapper
          href={`#${id}`}
          onClick={e => navigateToSection(e, id as string)}
        >
          <S.AnchorIcon />
          <S.Title>{text.title}</S.Title>
        </S.TitleWrapper>
      )}
      {textByLine(text.text).map((line, i) => (
        <TypographyText key={i}>{line}</TypographyText>
      ))}
      {text.link &&
        text.link_to &&
        (/^\/(?!\/)/.test(text.link_to) ? (
          <S.ArrowLink highlight to={text.link_to}>
            {text.link}
          </S.ArrowLink>
        ) : (
          <S.Link to={text.link_to}>{text.link}</S.Link>
        ))}
    </S.Wrapper>
  )
}

export default Text
