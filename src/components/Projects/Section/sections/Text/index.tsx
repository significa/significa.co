import React from 'react'

import { IText } from '../../types'

import * as S from './styled'
import { textByLine } from '../../../../../utils/textByLine'
import { Text as TypographyText } from '../../../../UI'
import { titleToID } from '../../../../../utils/titleToID'
import { navigateToSection } from '../../../utils'

interface ITextProps extends IText {
  sectionLabel?: string
}

const Text = (props: ITextProps) => {
  const id = props.title ? titleToID(props.title) : undefined

  return (
    <S.Wrapper id={id}>
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
        <TypographyText key={i}>{line}</TypographyText>
      ))}
      {props.link &&
        (/^\/(?!\/)/.test(props.link.url) ? (
          <S.ArrowLink highlight to={props.link.url}>
            {props.link.text}
          </S.ArrowLink>
        ) : (
          <S.Link to={props.link.url}>{props.link.text}</S.Link>
        ))}
    </S.Wrapper>
  )
}

export default Text
