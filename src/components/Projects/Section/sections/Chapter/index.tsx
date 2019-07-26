import React from 'react'

import * as S from './styled'
import { Display } from '../../../../UI'

import { ChapterType } from '../../types'

const Chapter: React.FC<ChapterType> = ({ chapter: { title } }) => {
  return (
    <S.Wrapper>
      <Display>{title}</Display>
    </S.Wrapper>
  )
}

export default Chapter
