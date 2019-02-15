import styled from '@theme'

export const ProjectNavigation = styled.nav`
  box-sizing: border-box;
  position: fixed;
  z-index: 10;

  top: 0;
  left: 0;

  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  width: 18em;

  padding: 3em;
`
