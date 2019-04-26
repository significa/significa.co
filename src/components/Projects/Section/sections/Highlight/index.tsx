import React from 'react'

import { textByLine } from '../../../../../utils/textByLine'
import { IHighlight } from '../../types'

import { Big } from '../../../../UI'

import PaddedWrapper from '../common/PaddedWrapper'

const Highlight = (props: IHighlight) => {
  return (
    <PaddedWrapper>
      {textByLine(props.text).map((line, i) => (
        <Big key={i}>{line}</Big>
      ))}
    </PaddedWrapper>
  )
}

export default Highlight
