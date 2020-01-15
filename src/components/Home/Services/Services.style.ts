import styled from 'styled-components'

import { Container, Text as BaseText } from 'components/UI'

export const Wrapper = styled(Container)`
  display: flex;
`

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 3rem;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`

export const MiddleColumn = styled(Column)`
  margin-top: 10rem;
`

export const RightColumn = styled(Column)`
  margin-top: 20rem;
`

export const TextHolder = styled.div`
  position: sticky;
  top: 7rem;
  padding-bottom: 14rem;
`

export const Text = styled(BaseText)`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`
