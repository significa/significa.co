import React from 'react'

import { colorType } from '../../../utils/getColor'
import { Link } from '../Links'

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

class List extends React.Component<IList> {
  renderItem = (item: ItemType) =>
    typeof item === 'string' ? (
      item
    ) : (
      <Link to={item.link}>{item.linkText}</Link>
    )

  render() {
    return (
      <S.Ul>
        {this.props.items.map((item: ItemType, index: number) => (
          <S.Li color={this.props.color} key={index}>
            {this.renderItem(item)}
          </S.Li>
        ))}
      </S.Ul>
    )
  }
}

export { List }
