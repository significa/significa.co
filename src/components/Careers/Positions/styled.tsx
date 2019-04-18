import styled from '@theme'

import { ArrowLink } from '../../UI/Links/'

export const PositionItem = styled.div`
  padding-right: 20%;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.subtle};
    padding-bottom: 2em;
    margin-bottom: 2em;
  }

  img {
    margin-left: 0.7em;
    position: relative;
    top: 2px;
  }
`

export const PositionLink = styled(ArrowLink)`
  position: relative;

  svg {
    position: absolute;
    top: 0.5em;
    right: 0;
  }
`
