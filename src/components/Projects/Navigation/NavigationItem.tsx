import React from 'react'

import { titleToID } from '../../../utils/titleToID'
import { navigateToSection } from '../utils'

import {
  ChapterType,
  SectionType,
  TextType,
  StickyImageType,
  StickyVideoType,
} from '../Section/types'

import * as S from './styled'

export type PossibleTypes =
  | ChapterType
  | SectionType
  | TextType
  | StickyImageType
  | StickyVideoType

interface INavigationItem {
  item: PossibleTypes
  toggleVisible: () => void
  [key: string]: any
}

const getItemText = (item: PossibleTypes) => {
  switch (item.slice_type) {
    case 'chapter':
    case 'section':
    case 'text':
    case 'sticky_image':
    case 'sticky_video':
      return item.primary.title
    default:
      throw new Error('Unexpected type received')
  }
}

const NavigationItem: React.FC<INavigationItem> = ({
  item,
  toggleVisible,
  ...props
}) => {
  switch (item.slice_type) {
    case 'chapter':
      return (
        <S.AnimatedChapterTitle {...props}>
          {getItemText(item)}
        </S.AnimatedChapterTitle>
      )
    case 'section':
      return (
        <S.AnimatedBlockTitle {...props}>
          {getItemText(item)}
        </S.AnimatedBlockTitle>
      )
    default: {
      const title = getItemText(item)

      if (!title) {
        return null
      }

      return (
        <S.AnimatedSectionLink
          {...props}
          href={`#${titleToID(title)}`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            navigateToSection(e, titleToID(title))
            toggleVisible()
          }}
        >
          {getItemText(item)}
        </S.AnimatedSectionLink>
      )
    }
  }
}

export default NavigationItem
