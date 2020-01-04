import React, { useRef, useEffect, useState } from 'react'

import Img from '../../../../PrismicImage'

import { ComparisonType } from '../../types'

import * as S from './styled'

const Comparison: React.FC<ComparisonType> = ({
  primary: { caption, image_a, image_b },
}) => {
  const container = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(50)

  const startCapture = () => {
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('touchmove', onDrag)
    window.addEventListener('mouseup', removeListeners)
    window.addEventListener('touchend', removeListeners)
    window.addEventListener('dragend', removeListeners)
  }

  const removeListeners = React.useCallback(() => {
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('touchmove', onDrag)
    window.removeEventListener('mouseup', removeListeners)
    window.removeEventListener('touchend', removeListeners)
    window.removeEventListener('dragend', removeListeners)
  }, [])

  useEffect(() => {
    return removeListeners
  }, [removeListeners])

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
        <Img src={image_a.url} fluid={image_a.fluid} alt={image_a.alt} />
        <S.TopImage>
          <Img
            fluid={image_b.fluid}
            src={image_b.url}
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
