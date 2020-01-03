import React, { useRef } from 'react'

import { LabsThumb } from '../../UI'
import { ILabType } from '../../../pages/labs'

import useMeasure from '../../../hooks/useMeasure'

import * as S from './styled'

interface IHighlights {
  content: Array<{ node: { data: ILabType } }>
}

const ThumbHolder: React.FC<{}> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { height } = useMeasure(ref, 'a')
  const rowSpan = Math.ceil(height / 4)

  return (
    <S.Holder ref={ref} rowAmount={rowSpan}>
      {children}
    </S.Holder>
  )
}

const Highlights: React.FC<IHighlights> = ({ content }) => {
  return (
    <S.Container>
      {[...content].splice(0, 6).map((item, i) => (
        <ThumbHolder key={i}>
          <LabsThumb
            to={item.node.data.link}
            title={item.node.data.title}
            tagline={item.node.data.tagline}
            fluid={item.node.data.image.fluid}
            alt={item.node.data.image.alt}
            more={item.node.data.link_text}
            source={item.node.data.source}
          />
        </ThumbHolder>
      ))}
    </S.Container>
  )
}

export default Highlights
