import styled from '@theme'
import { Text } from '../Typography'
import { getColor } from '../../../utils/getColor'

export const Ul = styled.ul``

export const Li = styled(Text).attrs({ as: 'li' })`
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
    left: -12px;
  }
`
