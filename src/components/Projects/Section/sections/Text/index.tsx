import React from 'react'

import { IText } from '../../../../../templates/types'

import * as S from './styled'
import { textByLine } from '../../../../../utils/textByLine'
import { Text as TypographyText } from '../../../../UI'

const Text = (props: IText) => {
  return (
    <S.Wrapper>
      {props.title && <S.Title>{props.title}</S.Title>}
      {textByLine(props.text).map((line, i) => (
        <TypographyText key={i}>{line}</TypographyText>
      ))}
      {props.link && (
        <S.ArrowLink highlight to={props.link.url}>
          {props.link.text}
        </S.ArrowLink>
      )}
    </S.Wrapper>
  )
}

export default Text
