import React from 'react'

import { IColorsTheme, Theme } from '@theme'

import { ISection, sectionTypes } from '../../../templates/types'

import * as S from './styled'
import * as Sections from './sections'

type SectionsMap = { [K in sectionTypes]: React.ComponentType<any> }

interface ISectionProps {
  section: ISection
  theme: IColorsTheme
}

const Section = ({ theme, section }: ISectionProps) => {
  const SectionComponent =
    (Sections as SectionsMap)[section.type] || Sections.text

  return section.theme ? (
    <Theme theme={theme}>
      <S.SectionWrapper>
        <SectionComponent {...section.content} />
      </S.SectionWrapper>
    </Theme>
  ) : (
    <SectionComponent {...section.content} />
  )
}

export default Section
