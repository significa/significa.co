import React from 'react'

import { colorType } from '../../../utils/getColor'

import { Ul, Li } from './styled'

interface IList {
  items: string[]
  color?: colorType
}

const List: React.FC<IList> = ({ items, color }) => (
  <Ul>
    {items.map((item: string, index: number) => (
      <Li color={color} key={index}>
        {item}
      </Li>
    ))}
  </Ul>
)

export { List }
