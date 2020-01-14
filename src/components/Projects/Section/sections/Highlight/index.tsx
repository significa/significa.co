import React from 'react'

import { textByLine } from '../../../../../utils/textByLine'
import { Big } from '../../../../UI'
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
