import React from 'react'

import { IColorsTheme, Theme } from '@theme'

import { ISection, sectionTypes } from '../../../templates/types'

import * as S from './styled'
import * as Sections from './sections'

import { Container } from '../../UI'
import ConditionalWrap from '../../utils/ConditionalWrap'

type SectionsMap = { [K in sectionTypes]: React.ComponentType<any> }

interface ISectionProps {
  section: ISection
  theme: IColorsTheme
}

const Section = ({ theme, section }: ISectionProps) => {
  const SectionComponent =
    (Sections as SectionsMap)[section.type] || Sections.text

  return (
    <ConditionalWrap
      condition={!!section.theme}
      wrap={children => <Theme theme={theme}>{children}</Theme>}
    >
      <S.SectionWrapper>
        <Container>
          <SectionComponent {...section.content} />
        </Container>
      </S.SectionWrapper>
    </ConditionalWrap>
  )
}

export default Section
