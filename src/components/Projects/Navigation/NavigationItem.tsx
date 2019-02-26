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
  setVisible: (visible: boolean) => void
}

const NavigationItem: React.FC<INavigationItem> = ({
  item,
  style,
  setVisible,
}) => {
  switch (item.type) {
    case 'chapter':
      return (
        <S.AnimatedChapterTitle style={style}>
          {item.text}
        </S.AnimatedChapterTitle>
      )
    case 'block':
      return (
        <S.AnimatedBlockTitle style={style}>{item.text}</S.AnimatedBlockTitle>
      )
    case 'section':
      return (
        <S.AnimatedSectionLink
          style={style}
          href={`#${titleToID(item.text)}`}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            navigateToSection(e, titleToID(item.text))
            setVisible(false)
          }}
        >
          {item.text}
        </S.AnimatedSectionLink>
      )
    default:
      return null
  }
}

export default NavigationItem
