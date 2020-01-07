import React from 'react'

import * as S from './styled'
import { Display } from '../../../../UI'

import { ChapterType } from '../../types'

const Chapter: React.FC<ChapterType> = ({ primary: { title, show_title } }) => {
  if (show_title === 'true') {
    return (
      <S.Wrapper>
        <Display>{title}</Display>
      </S.Wrapper>
    )
  }

  return null
}

export default Chapter
