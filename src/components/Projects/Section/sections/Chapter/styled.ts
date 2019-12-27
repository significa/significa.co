import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  padding: 2em;

  min-height: 50vh;

  background-color: ${({ theme }) => theme.colors.background};
`
