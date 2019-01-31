import React from 'react'
import Img from 'gatsby-image'

import { IComparison } from '../../../../../templates/types'

import DoubleArrow from './DoubleArrow'

import * as S from './styled'

class Comparison extends React.Component<IComparison> {
  container = React.createRef<HTMLDivElement>()

  state = { visible: 50 }

  componentWillUnmount() {
    this.removeListeners()
  }

  startCapture = () => {
    window.addEventListener('mousemove', this.onDrag)
    window.addEventListener('touchmove', this.onDrag)
    window.addEventListener('mouseup', this.removeListeners)
    window.addEventListener('touchend', this.removeListeners)
  }

  removeListeners = () => {
    window.removeEventListener('mousemove', this.onDrag)
    window.removeEventListener('touchmove', this.onDrag)
    window.removeEventListener('mouseup', this.removeListeners)
    window.removeEventListener('touchend', this.removeListeners)
  }

  onDrag = (e: MouseEvent | TouchEvent) => {
    if (!this.container.current) {
      return null
    }

    const {
      left: containerLeft,
      width: containerWidth,
    } = this.container.current.getBoundingClientRect()
    const x: number = 'touches' in e ? e.touches[0].clientX : e.clientX
    const relativeX: number = x - containerLeft
    const target: number = (relativeX * 100) / containerWidth

    return target >= 0 && target <= 100
      ? this.setState({ visible: target })
      : null
  }

  render() {
    const { a, b, caption } = this.props
    return (
      <S.Wrapper>
        <S.Container ref={this.container}>
          <S.Controls>
            <S.Line style={{ left: `${this.state.visible}%` }} />
            <S.DragHandle
              style={{ left: `${this.state.visible}%` }}
              onMouseDown={this.startCapture}
              onTouchStart={this.startCapture}
            >
              <DoubleArrow />
            </S.DragHandle>
          </S.Controls>

          <Img fluid={a.childImageSharp.fluid} />
          <S.TopImage>
            <Img
              fluid={b.childImageSharp.fluid}
              style={{ height: '100%', width: `${this.state.visible}%` }}
            />
          </S.TopImage>
        </S.Container>

        {caption && <S.Caption>{caption}</S.Caption>}
      </S.Wrapper>
    )
  }
}

export default Comparison
