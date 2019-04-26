import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { RightContent } from '../../UI/Layout'

import * as S from './styled'

interface ISection {
  title: string
  text: string
}

interface ICareersAbout {
  careersYaml: {
    about: {
      title: string
      sections: ISection[]
      cta: { link: string; linkText: string }
    }
  }
}

const About: React.FC = () => {
  const {
    careersYaml: { about },
  }: ICareersAbout = useStaticQuery(careersAboutQuery)

  const renderSection = ({ title, text }: ISection) => (
    <S.Section key={title}>
      <S.SectionTitle as="h4">{title}</S.SectionTitle>
      <S.SectionText>{text}</S.SectionText>
    </S.Section>
  )

  return (
    <RightContent amountColumn={3} title={about.title}>
      <>
        <S.SectionWrapper>{about.sections.map(renderSection)}</S.SectionWrapper>
        <S.ArrowLink highlight to={about.cta.link}>
          {about.cta.linkText}
        </S.ArrowLink>
      </>
    </RightContent>
  )
}

const careersAboutQuery = graphql`
  query CareersAboutQuery {
    careersYaml {
      about {
        title
        sections {
          title
          text
        }
        cta {
          link
          linkText
        }
      }
    }
  }
`

export default About
