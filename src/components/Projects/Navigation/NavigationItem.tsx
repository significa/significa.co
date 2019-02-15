import React from 'react'

import { titleToID } from '../../../utils/titleToID'
import { navigateToSection } from '../utils'

export interface IItem {
  type: 'chapter' | 'block' | 'section'
  text: string
}

interface INavigationItem {
  item: IItem
}

const NavigationItem: React.FC<INavigationItem> = ({ item }) => {
  switch (item.type) {
    case 'chapter':
      return <h1>{item.text}</h1>
    case 'block':
      return <h2>{item.text}</h2>
    case 'section':
      return (
        <a
          href={`#${titleToID(item.text)}`}
          onClick={e => navigateToSection(e, titleToID(item.text))}
        >
          {item.text}
        </a>
      )
    default:
      return null
  }
}

export default NavigationItem
