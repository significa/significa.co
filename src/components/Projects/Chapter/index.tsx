import React from 'react'

import * as S from './styled'
import { Display } from '../../UI'

interface IChapter {
  title: string
}

const Chapter: React.FC<IChapter> = ({ title }) => {
  return (
    <S.Wrapper>
      <Display>{title}</Display>
    </S.Wrapper>
  )
}

export default Chapter
