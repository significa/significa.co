import React from 'react'

import { Big } from 'components/UI'
import { textByLine } from 'utils/textByLine'

import { HighlightType } from '../../types'
import PaddedWrapper from '../common/PaddedWrapper'

const Highlight = ({ primary: { text } }: HighlightType) => {
  return (
    <PaddedWrapper>
      {textByLine(text).map((line, i) => (
        <Big key={i}>{line}</Big>
      ))}
    </PaddedWrapper>
  )
}

export default Highlight
