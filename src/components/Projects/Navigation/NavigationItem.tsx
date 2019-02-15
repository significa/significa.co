import React from 'react'

import { titleToID } from '../../../utils/titleToID'
import { navigateToSection } from '../utils'

import * as S from './styled'

export interface IItem {
  type: 'chapter' | 'block' | 'section'
  text: string
}

interface INavigationItem {
  item: IItem
  style: object
}

const NavigationItem: React.FC<INavigationItem> = ({ item, style }) => {
  switch (item.type) {
    case 'chapter':
      return <S.ChapterTitle style={style}>{item.text}</S.ChapterTitle>
    case 'block':
      return <S.BlockTitle style={style}>{item.text}</S.BlockTitle>
    case 'section':
      return (
        <S.SectionLink
          style={style}
          href={`#${titleToID(item.text)}`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
            navigateToSection(e, titleToID(item.text))
          }
        >
          {item.text}
        </S.SectionLink>
      )
    default:
      return null
  }
}

export default NavigationItem
