import React from 'react'

import { textByLine } from '../../../../../utils/textByLine'
import { HighlightType } from '../../types'

import { Big } from '../../../../UI'

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
