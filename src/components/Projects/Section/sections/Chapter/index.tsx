import React from 'react'

import * as S from './styled'
import { Display } from '../../../../UI'

import { ChapterType } from '../../types'

const Chapter: React.FC<ChapterType> = ({ chapter: { title, showTitle } }) => {
  if (showTitle === "Don't show title") {
    return null
  }

  return (
    <S.Wrapper>
      <Display>{title}</Display>
    </S.Wrapper>
  )
}

export default Chapter
