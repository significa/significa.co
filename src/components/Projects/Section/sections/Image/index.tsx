import React from 'react'
import Img from 'gatsby-image'

import { IImage } from '../../types'

import * as S from './styled'

const Image = (props: IImage) => {
  return (
    <figure>
      <Img fluid={props.image.childImageSharp.fluid} />
      {props.caption && <S.Caption>{props.caption}</S.Caption>}
    </figure>
  )
}

export default Image
