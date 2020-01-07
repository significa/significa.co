import React from 'react'
import { FluidObject } from 'gatsby-image'

import { Big } from '../../UI/'

import * as S from './styled'

interface IHero {
  title: string
  tagline: string
  fluid: FluidObject
  src?: string
}

const Hero: React.FC<IHero> = ({ title, tagline, fluid, src }) => {
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
      <S.Img
        fluid={fluid}
        src={src}
        loading="eager"
        // When previewing Prismic content we fallback to
        // a standard img tag that needs some specific gatsby-image styles
        fallbackImgStyle={
          src
            ? {
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
              }
            : {}
        }
      />
    </S.Section>
  )
}

export default Hero
