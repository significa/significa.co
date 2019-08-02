import styled from '@theme'

import { Container } from '../../UI'

export const Wrapper = styled(Container)`
  display: flex;
  align-items: flex-start;

  margin-top: 3rem;
`

export const NavHolder = styled.aside`
  top: 0;
  padding-top: 3rem;
  position: sticky;

  flex: 1;
  max-width: 14rem;
  max-height: calc(100vh - 3rem);

  overflow-y: auto;
`

export const Main = styled.main`
  flex: 1;
  margin-top: 3rem;
  margin-left: 3rem;
`
