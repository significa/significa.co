import styled, { css } from 'styled-components'
import { Text } from '../Typography'
import { getColor } from '../../../utils/getColor'

export const Ul = styled.ul``

export const liBaseStyle = css`
  position: relative;
  margin-bottom: 0.1875rem;

  &:before {
    display: block;
    position: absolute;
    left: -12px;
  }
`

export const Li = styled(Text).attrs({ as: 'li' })`
  ${liBaseStyle}

  &:before {
    content: '-';
    color: ${props =>
      !props.color || props.color === 'foreground'
        ? props.theme.colors.highlight
        : getColor(props)};
  }
`
