import React from 'react'
import { FluidObject } from 'gatsby-image'

import { Big } from '../../UI/'

import * as S from './styled'

interface INext {
  fluid: FluidObject
  title: string
  tagline: string
  link: string
}

const Next: React.FC<INext> = ({ title, tagline, link, fluid }) => {
  return (
    <S.Section>
      <S.Container>
        <S.Display>{title}</S.Display>
        <Big>{tagline}</Big>
        <S.ArrowLink to={link}>View project</S.ArrowLink>
      </S.Container>
      <S.Img fluid={fluid} />
    </S.Section>
  )
}

export default Next
