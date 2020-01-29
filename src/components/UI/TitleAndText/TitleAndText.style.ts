import styled from 'styled-components'

import {
  ArrowLink as BaseArrowLink,
  Text as BaseText,
  Title as BaseTitle,
} from 'components/UI'

export const Holder = styled.div``

export const Title = styled(BaseTitle)`
  margin-bottom: 2rem;
`

export const Text = styled(BaseText)`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ArrowLink = styled(BaseArrowLink)`
  margin-top: 3rem;
`
