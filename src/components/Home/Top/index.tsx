import React from 'react'

import * as S from './styled'

interface ITop {
  headline: string
}

const Top: React.FC<ITop> = ({ headline }) => (
  <S.Container>
    <S.Huge>{headline}</S.Huge>
  </S.Container>
)

export default Top
