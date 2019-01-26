import React from 'react'

import { IText } from '../../../../../templates/types'

import * as S from './styled'
import { textByLine } from '../../../../../utils/textByLine'
import { Text as TypographyText, Title, ArrowLink } from '../../../../UI'

const Text = (props: IText) => {
  return (
    <S.Wrapper>
      {props.title && <Title>{props.title}</Title>}
      {textByLine(props.text).map((line, i) => (
        <TypographyText key={i}>{line}</TypographyText>
      ))}
      {props.link && (
        <ArrowLink highlight to={props.link.url}>
          {props.link.text}
        </ArrowLink>
      )}
    </S.Wrapper>
  )
}

export default Text
