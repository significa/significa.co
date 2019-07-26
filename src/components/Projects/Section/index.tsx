import React from 'react'

import { IColorsTheme, Theme } from '@theme'

import { SectionsType, SectionBase, completeLayoutTypes } from './types'

import * as S from './styled'
import * as Sections from './sections'

import { Container } from '../../UI'
import ConditionalWrap from '../../utils/ConditionalWrap'
import { getProjectSectionWidth } from './utils'
import { getProjectTheme } from '../../../utils/getProjectTheme'

interface ISectionProps {
  section: SectionsType
  sectionLabel?: string
  themes: Array<IColorsTheme & { name: string }>
}

type SectionMapType = {
  [key in SectionsType['type']]: React.ComponentType<any> | null
}

const sectionMap: SectionMapType = {
  chapter: Sections.Chapter,
  section: null,
  text: Sections.Text,
  image: Sections.Image,
  video: Sections.Video,
  image_gallery: Sections.Gallery,
  comparison: Sections.Comparison,
  slideshow: Sections.Slideshow,
  waterfall: Sections.Waterfall,
  testimonial: Sections.Testimonial,
  embed: Sections.Embed,
  highlight: Sections.Highlight,
  sticky_image: Sections.Sticky,
  sticky_video: Sections.Sticky,
}

const getMaxWidth = (
  type: SectionsType['type'],
  layout: completeLayoutTypes
) => {
  const style = {
    maxWidth: getProjectSectionWidth(type, layout),
  }

  return layout && layout === 'full' ? { ...style, padding: 0 } : style
}

const Section: React.FC<ISectionProps> = ({
  section,
  sectionLabel,
  themes,
}) => {
  /**
   * We have `theme`, `layout` and `margin` on a section named after type
   * e.g.: Text section has a `text` key with this information inside
   */
  const sectionMainContent: SectionBase = (section as any)[section.type]

  const SectionComponent = sectionMap[section.type]

  if (!SectionComponent) {
    return null
  }

  return (
    <ConditionalWrap
      condition={!!sectionMainContent.theme}
      wrap={children => (
        <Theme
          theme={getProjectTheme(sectionMainContent.theme as string, themes)}
        >
          {children}
        </Theme>
      )}
    >
      <S.SectionWrapper margin={sectionMainContent.margin}>
        <Container style={getMaxWidth(section.type, sectionMainContent.layout)}>
          <SectionComponent {...section} sectionLabel={sectionLabel} />
        </Container>
      </S.SectionWrapper>
    </ConditionalWrap>
  )
}

export default Section
