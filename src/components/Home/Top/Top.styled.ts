import styled from 'styled-components'

import { Container as BaseContainer, Huge as BaseHuge } from '../../UI'

export const Wrapper = styled(BaseContainer)`
  margin-top: 7rem;
  margin-bottom: 7rem;
`

export const Holder = styled.div`
  max-width: 28rem;
`

export const WordHolder = styled(BaseHuge).attrs({ as: 'span' })`
  overflow: hidden;
  display: inline-block;
  margin-right: 0.5rem;

  font-size: 3.25em;
  max-width: 24rem;

  &:last-child * {
    color: ${({ theme }) => theme.colors.medium};
  }
`
