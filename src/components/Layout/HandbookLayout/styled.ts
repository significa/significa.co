import styled from '@theme'

import { Container } from '../../UI'

export const Wrapper = styled(Container)`
  display: flex;
  align-items: flex-start;
`

export const NavHolder = styled.aside`
  top: 0;
  padding: 5rem 0;
  position: sticky;

  width: 14rem;
  flex-shrink: 0;
  max-height: calc(100vh - 5rem);

  overflow-y: auto;
`

export const Main = styled.main`
  width: 100%;
  margin-top: 5rem;
  padding-left: 3rem;
`
