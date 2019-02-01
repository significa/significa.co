import React from 'react'

import { colorType } from '../../../utils/getColor'
import { Link } from '../Links/'

import * as S from './styled'

type ItemType =
  | string
  | {
      link: string
      linkText: string
    }

interface IList {
  items: ItemType[]
  color?: colorType
}

const List: React.FC<IList> = ({ items, color }) => {
  return (
    <S.Ul>
      {items.map((item: ItemType, index: number) => (
        <S.Li color={color} key={index}>
          {typeof item === 'string' ? (
            item
          ) : (
            <Link to={item.link}>{item.linkText}</Link>
          )}
        </S.Li>
      ))}
    </S.Ul>
  )
}

export default List
