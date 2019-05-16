import React from 'react'

import * as S from './styled'
import { Display } from '../../UI'

import { marginTypes } from '../Section/types'

interface IChapter {
  title: string
  margin?: marginTypes
}

const Chapter: React.FC<IChapter> = ({ title, margin }) => {
  return (
    <S.Wrapper margin={margin}>
      <Display>{title}</Display>
    </S.Wrapper>
  )
}

export default Chapter
