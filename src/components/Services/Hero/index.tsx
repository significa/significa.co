import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { textByLine } from '../../../utils/textByLine'
import { List } from '../../UI'

import arrowSketch from './arrowsketch.svg'
import * as S from './styled'

interface IServiceItem {
  title: string
  items: string[]
}

interface IServicesHero {
  servicesYaml: {
    hero: {
      title: string
      text: string
      services: IServiceItem[]
    }
  }
}

const Hero = () => {
  const {
    servicesYaml: { hero },
  }: IServicesHero = useStaticQuery(query)

  return (
    <>
      <S.TopWrapper>
        <S.Title>{hero.title}</S.Title>
        {textByLine(hero.text).map((line, i) => {
          return <S.Text key={i}>{line}</S.Text>
        })}
      </S.TopWrapper>
      <S.ServicesWrapper>
        {hero.services.map((service, i) => {
          return (
            <S.ServiceItem key={i}>
              <S.ListTitle>{service.title}</S.ListTitle>
              <List items={service.items} />
            </S.ServiceItem>
          )
        })}
        <S.ArrowImg src={arrowSketch} alt="Arrow Sketch" />
      </S.ServicesWrapper>
    </>
  )
}

const query = graphql`
  query ServicesHeroQuery {
    servicesYaml {
      hero {
        title
        text
        services {
          title
          items
        }
      }
    }
  }
`

export default Hero
