import React from 'react'

import { textByLine } from '../../../../../utils/textByLine'
import { IHighlight } from '../../types'

import { Big } from '../../../../UI'

import * as S from './styled'

const Highlight = (props: IHighlight) => {
  return (
    <S.Wrapper>
      {textByLine(props.text).map((line, i) => (
        <Big key={i}>{line}</Big>
      ))}
    </S.Wrapper>
  )
}

export default Highlight
