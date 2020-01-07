import React from 'react'

import { IColorsTheme, Theme, lightTheme } from '@theme'

import { SectionsType, completeLayoutTypes } from './types'

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
  [key in SectionsType['slice_type']]: React.ComponentType<any> | null
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
  type: SectionsType['slice_type'],
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
  const SectionComponent = sectionMap[section.slice_type]

  if (!SectionComponent) {
    return null
  }

  return (
    <ConditionalWrap
      condition={'theme' in section.primary ? !!section.primary.theme : false}
      wrap={children => (
        <Theme
          theme={
            'theme' in section.primary
              ? getProjectTheme(section.primary.theme as string, themes)
              : lightTheme
          }
        >
          {children}
        </Theme>
      )}
    >
      <S.SectionWrapper
        margin={'margin' in section.primary ? section.primary.margin : 'none'}
      >
        <Container
          style={
            'layout' in section.primary
              ? getMaxWidth(section.slice_type, section.primary.layout)
              : {}
          }
        >
          <SectionComponent {...section} sectionLabel={sectionLabel} />
        </Container>
      </S.SectionWrapper>
    </ConditionalWrap>
  )
}

export default Section
