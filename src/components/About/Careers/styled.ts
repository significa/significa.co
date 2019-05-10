import styled, { media } from '@theme'
import { Container, Text as BaseText } from '../../UI'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding-bottom: 7.5em;
`

export const Text = styled(BaseText)`
  margin-bottom: 1em;
`

export const Gallery = styled(Container)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5em;

  ${media.medium} {
    grid-row-gap: 1.5em;
    grid-template: auto / 1fr;
  }
`
