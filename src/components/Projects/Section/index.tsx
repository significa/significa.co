import React from 'react'

import { IColorsTheme, Theme } from '@theme'

import { ISection, sectionTypes } from './types'

import * as S from './styled'
import * as Sections from './sections'

import { Container } from '../../UI'
import ConditionalWrap from '../../utils/ConditionalWrap'
import { getProjectSectionWidth } from './utils'

type SectionsMap = { [K in sectionTypes]: React.ComponentType<any> }

interface ISectionProps {
  section: ISection
  theme: IColorsTheme
}

class Section extends React.Component<ISectionProps> {
  getMaxWidth = (): { maxWidth: string; padding?: number } => {
    const { section } = this.props

    const style = {
      maxWidth: getProjectSectionWidth(section.type, section.layout),
    }

    return section.layout && section.layout === 'full'
      ? { ...style, padding: 0 }
      : style
  }

  render() {
    const { theme, section } = this.props

    const SectionComponent =
      (Sections as SectionsMap)[section.type] || Sections.text

    return (
      <ConditionalWrap
        condition={!!section.theme}
        wrap={children => <Theme theme={theme}>{children}</Theme>}
      >
        <S.SectionWrapper margin={section.margin}>
          <Container style={this.getMaxWidth()}>
            <SectionComponent {...section.content} />
          </Container>
        </S.SectionWrapper>
      </ConditionalWrap>
    )
  }
}

export default Section
