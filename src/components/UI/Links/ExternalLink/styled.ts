import styled from 'styled-components'
import { media } from '@theme'
import { ExternalIcon as Icon } from './ExternalIcon'
import { baseStyle } from '../common'

export const ExternalIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 50%;
  opacity: 0;
  transform: translate(100%, -50%);

  g {
    stroke: ${({ theme }) => theme.colors.medium};
  }

  transition: ${({ theme }) =>
    `transform ${theme.transitions.cubic()}, opacity ${theme.transitions.ease()}`};
`

export const ExternalLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  position: relative;
  ${baseStyle}

  ${media.hover} {
    &:hover {
      ${ExternalIcon} {
        transform: translate(calc(100% + 0.25em), calc(-50% - 0.25em));
        opacity: 1;
      }
    }
  }
`
