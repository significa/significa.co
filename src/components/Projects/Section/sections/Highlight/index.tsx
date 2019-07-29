import React from 'react'

import { textByLine } from '../../../../../utils/textByLine'
import { HighlightType } from '../../types'

import { Big } from '../../../../UI'

import PaddedWrapper from '../common/PaddedWrapper'

const Highlight = ({ highlight: { text } }: HighlightType) => {
  return (
    <PaddedWrapper>
      {textByLine(text).map(line => (
        <Big key={line}>{line}</Big>
      ))}
    </PaddedWrapper>
  )
}

export default Highlight
