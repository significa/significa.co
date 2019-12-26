import styled from 'styled-components'

import {
  Container as BaseContainer,
  Huge as BaseHuge,
  SmallTitle as BaseSmallTitle,
} from '../../UI/'

export const Wrapper = styled(BaseContainer)`
  height: 70vh;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin-bottom: 5rem;
`

export const Info = styled.div`
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Huge = styled(BaseHuge)`
  font-size: 3.25em;
  max-width: 24rem;

  transform: translateY(-75%);
`

export const SmallTitle = styled(BaseSmallTitle)`
  max-width: 34rem;
`
