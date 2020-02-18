import React from 'react'

import { textByLine } from 'utils/textByLine'

import * as S from './RightContent.styled'

interface IRightContent {
  title: string
  children: React.ReactNode
  gridTemplate?: [string, string?, string?]
  className?: string
}

const RightContent: React.FC<IRightContent> = ({
  title,
  children,
  gridTemplate = ['2fr 3fr', '1fr', '1fr'],
  className,
}) => {
  return (
    <S.Container className={className} gridTemplate={gridTemplate}>
      <div>
        {textByLine(title).map((l, i) => (
          <S.Title key={i}>{l}</S.Title>
        ))}
      </div>
      <div>{children}</div>
    </S.Container>
  )
}

export default RightContent
