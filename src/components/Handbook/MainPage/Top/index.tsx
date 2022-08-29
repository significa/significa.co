import React from 'react'

import { textByLine } from '../../../../utils/textByLine'
import { Big } from '../../../UI'
import * as S from './styled'

interface TopProps {
  title: string
  description: string
  sideNote: string
}

const Top = ({ title, description, sideNote }: TopProps) => {
  return (
    <S.Wrapper>
      <S.Left>
        <S.Title>{title}</S.Title>
        <Big>{description}</Big>
      </S.Left>
      <S.Sidenote>
        {textByLine(sideNote).map((line, i) => {
          return <S.SidenoteText key={i}>{line}</S.SidenoteText>
        })}
      </S.Sidenote>
    </S.Wrapper>
  )
}

export default Top
