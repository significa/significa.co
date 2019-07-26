import React, { useRef, useEffect, useState } from 'react'
import Img from 'gatsby-image'

import { ComparisonType } from '../../types'

import * as S from './styled'

const Comparison: React.FC<ComparisonType> = ({
  comparison: { caption, image_a, image_aSharp, image_b, image_bSharp },
}) => {
  const container = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(50)

  useEffect(() => {
    return removeListeners
  }, [])

  const startCapture = () => {
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('touchmove', onDrag)
    window.addEventListener('mouseup', removeListeners)
    window.addEventListener('touchend', removeListeners)
    window.addEventListener('dragend', removeListeners)
  }

  const removeListeners = () => {
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('touchmove', onDrag)
    window.removeEventListener('mouseup', removeListeners)
    window.removeEventListener('touchend', removeListeners)
    window.removeEventListener('dragend', removeListeners)
  }

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (container.current) {
      const { left, width } = container.current.getBoundingClientRect()
      const x: number = 'touches' in e ? e.touches[0].clientX : e.clientX
      const relativeX: number = x - left
      const target: number = (relativeX * 100) / width

      setVisible(Math.min(Math.max(target, 0), 100))
    }
  }

  return (
    <S.Wrapper>
      <S.Container ref={container}>
        <S.Controls>
          <S.Line style={{ left: `${visible}%` }} />
          <S.DragHandle
            style={{ left: `${visible}%` }}
            onMouseDown={startCapture}
            onTouchStart={startCapture}
          >
            <S.Icon />
          </S.DragHandle>
        </S.Controls>
        <Img fluid={image_aSharp.childImageSharp.fluid} alt={image_a.alt} />
        <S.TopImage>
          <Img
            fluid={image_bSharp.childImageSharp.fluid}
            alt={image_b.alt}
            style={{ height: '100%', width: `${visible}%` }}
          />
        </S.TopImage>
      </S.Container>

      {caption && <S.Caption>{caption}</S.Caption>}
    </S.Wrapper>
  )
}

export default Comparison
