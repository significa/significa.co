import styled from '@theme'
import { Container as BaseContainer, Display, Text as BaseText } from '../../UI'

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};

  padding: 12.5rem 0;
`

export const Container = styled(BaseContainer).attrs({ as: 'div' })``

export const Title = styled(Display)`
  text-align: center;

  max-width: 35rem;
  margin: 0 auto;
  margin-bottom: 0.75rem;
`

export const SubText = styled(BaseText)`
  text-align: center;

  max-width: 35rem;
  margin: 0 auto;
`
