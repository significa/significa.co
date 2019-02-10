import React from 'react'
import Img from 'gatsby-image'

import { ISlideshow } from '../../types'

import Arrow from './Arrow'

import * as S from './styled'

interface ISlideShowState {
  index: number
}

class Slideshow extends React.Component<ISlideshow, ISlideShowState> {
  state = { index: 0 }

  handleNextSlide = () => {
    const { items } = this.props

    this.setState(state => ({
      index:
        state.index === items.length - 1 ? items.length - 1 : state.index + 1,
    }))
  }

  handlePrevSlide = () => {
    this.setState(state => ({ index: state.index <= 0 ? 0 : state.index - 1 }))
  }

  render() {
    const { items } = this.props
    const { index } = this.state
    const translate = (index % items.length) * (100 / items.length)

    return (
      <S.Wrapper>
        <S.SlideWrapper>
          <S.SlideInner
            style={{
              width: items.length * 100 + '%',
              transform: `translateX(${-translate}%)`,
            }}
          >
            {items.map((item, i) => {
              return (
                <Img
                  style={{ width: '100%' }}
                  key={i}
                  fluid={item.image.childImageSharp.fluid}
                />
              )
            })}
          </S.SlideInner>
        </S.SlideWrapper>
        <S.Controls>
          <S.Left onClick={this.handlePrevSlide}>
            <Arrow />
          </S.Left>
          <S.Right onClick={this.handleNextSlide}>
            <Arrow />
          </S.Right>
        </S.Controls>
      </S.Wrapper>
    )
  }
}

export default Slideshow
