import React from 'react'

import { textByLine } from '../../../../utils/textByLine'
import * as S from './RightContent.styled'

interface IRightContent {
  title: string
  children: React.ReactNode
  amountColumn?: 2 | 3 | 4
  className?: string
}

const RightContent: React.FC<IRightContent> = ({
  title,
  children,
  amountColumn = 2,
  className,
}) => {
  return (
    <S.Container className={className}>
      <S.Left amountColumn={amountColumn}>
        {textByLine(title).map((l, i) => (
          <S.Title key={i}>{l}</S.Title>
        ))}
      </S.Left>
      <S.Right amountColumn={amountColumn}>{children}</S.Right>
    </S.Container>
  )
}

export default RightContent
