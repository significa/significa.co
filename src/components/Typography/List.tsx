import React from 'react'
import styled from '@theme'
import { Text } from './styled'
import { getColor, colorType } from '../utils/getColor'

const Wrapper = styled.ul``

const ListItem = styled(Text).attrs({ as: 'li' })`
  position: relative;
  margin-bottom: 0.1875rem;

  &:before {
    content: '-';
    display: block;
    position: absolute;
    color: ${props =>
      !props.color || props.color === 'foreground'
        ? props.theme.colors.highlight
        : getColor(props)};
    left: -${({ theme }) => theme.space[4]}px;
  }
`

interface IList {
  items: string[]
  color: colorType
}

const List = ({ items, color }: IList) => (
  <Wrapper>
    {items.map((item: string, index: number) => (
      <ListItem color={color} key={index}>
        {item}
      </ListItem>
    ))}
  </Wrapper>
)

export default List
