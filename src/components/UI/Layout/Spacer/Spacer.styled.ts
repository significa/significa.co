import styled from 'styled-components'

import { media } from '@theme'

import { Spacing } from './Spacer'

export const Wrapper = styled.div<{ spacing: Spacing }>`
  padding-top: ${({ spacing }) => spacing.top[0]};
  padding-bottom: ${({ spacing }) => spacing.bottom[0]};

  ${media.medium} {
    padding-top: ${({ spacing }) => spacing.top[1]};
    padding-bottom: ${({ spacing }) => spacing.bottom[1]};
  }

  ${media.small} {
    padding-top: ${({ spacing }) => spacing.top[2]};
    padding-bottom: ${({ spacing }) => spacing.bottom[2]};
  }
`
