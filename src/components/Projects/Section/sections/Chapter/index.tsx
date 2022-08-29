import React from 'react'

import { Display } from '../../../../UI'
import { ChapterType } from '../../types'
import * as S from './styled'

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
