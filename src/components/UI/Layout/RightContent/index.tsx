import React from 'react'

import * as S from './styled'

interface IRightContent {
  title: string
  children: React.ReactNode
}

const RightContent: React.FC<IRightContent> = ({ title, children }) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Left>
          <S.Title>{title}</S.Title>
        </S.Left>
        <S.Right>{children}</S.Right>
      </S.Container>
    </S.Wrapper>
  )
}

export default RightContent
