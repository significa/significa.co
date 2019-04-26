import React, { useRef } from 'react'

import { LabsThumb } from '../../UI'
import { ILabType } from '../../../pages/labs'

import useMeasure from '../../../hooks/useMeasure'

import * as S from './styled'

interface IHighlights {
  content: ILabType[]
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
            to={item.link}
            title={item.title}
            tagline={item.tagline}
            fluid={item.image.childImageSharp.fluid}
            more={item.more}
            source={item.source}
          />
        </ThumbHolder>
      ))}
    </S.Container>
  )
}

export default Highlights
