import React from 'react'
import { FluidObject } from 'gatsby-image'

import { Big } from '../../UI/Typography'

import * as S from './styled'

interface IHero {
  title: string
  tagline: string
  fluid: FluidObject
}

const Hero: React.FC<IHero> = ({ title, tagline, fluid }) => {
  return (
    <S.Section>
      <S.Container>
        <S.ProjectInfo>
          <S.Title>{title}</S.Title>
          <Big>{tagline}</Big>
        </S.ProjectInfo>
        <S.ArrowLink to="/showcase" reverse>
          Back to showcase
        </S.ArrowLink>
      </S.Container>
      <S.Img fluid={fluid} />
    </S.Section>
  )
}

export { Hero }
