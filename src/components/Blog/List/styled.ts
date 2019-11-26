import styled from '@theme'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > * {
    width: calc((100% / 2) - 2.2rem);
  }
`
