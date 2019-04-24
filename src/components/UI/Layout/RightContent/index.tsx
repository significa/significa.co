import React from 'react'

import * as S from './styled'

interface IRightContent {
  title: string
  children: React.ReactNode
  amountColumn?: 2 | 3 | 4
}

const RightContent: React.FC<IRightContent> = ({
  title,
  children,
  amountColumn = 2,
}) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Left amountColumn={amountColumn}>
          <S.Title>{title}</S.Title>
        </S.Left>
        <S.Right amountColumn={amountColumn}>{children}</S.Right>
      </S.Container>
    </S.Wrapper>
  )
}

export default RightContent
