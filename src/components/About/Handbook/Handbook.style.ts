import styled from 'styled-components'

import { ArrowLink, Text as BaseText } from 'components/UI'

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
`

export const Link = styled(ArrowLink)`
  margin-top: 2rem;
`

export const Text = styled(BaseText)`
  &:not(:last-child) {
    margin-bottom: 1em;
  }
`
