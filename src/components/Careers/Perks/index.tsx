import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { RightContent } from '../../UI/Layout'

import * as Eggs from './Eggs'
import * as S from './styled'

type EggType =
  | 'health'
  | 'learning'
  | 'food'
  | 'arcade'
  | 'fruit'
  | 'retreat'
  | 'equipment'
  | 'flexible'

interface ISection {
  title: string
  text: string
  egg: EggType
}

interface ICareersPerks {
  careersYaml: {
    perks: {
      title: string
      list: ISection[]
    }
  }
}

type EggsMap = { [K in EggType]: React.ComponentType<any> }

const Perks: React.FC = () => {
  const {
    careersYaml: { perks },
  }: ICareersPerks = useStaticQuery(careersPerksQuery)

  const renderEgg = (egg: EggType) => {
    const EggComponent = (Eggs as EggsMap)[egg]

    return <EggComponent />
  }

  const renderPerks = ({ title, text, egg }: ISection) => (
    <S.Item key={title}>
      {renderEgg(egg)}
      <S.ItemTitle as="h4">{title}</S.ItemTitle>
      <S.ItemText>{text}</S.ItemText>
    </S.Item>
  )

  return (
    <S.Wrapper id="perky-perks">
      <RightContent amountColumn={4} title={perks.title}>
        <S.Section>{perks.list.map(renderPerks)}</S.Section>
      </RightContent>
    </S.Wrapper>
  )
}

const careersPerksQuery = graphql`
  query CareersPerksQuery {
    careersYaml {
      perks {
        title
        list {
          title
          text
          egg
        }
      }
    }
  }
`

export default Perks
