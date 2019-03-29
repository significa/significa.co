import styled from '@theme'
import { Container as BaseContainer, Display, Big as BaseBig } from '../../UI'

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};

  padding: 12.5rem 0;

  @media (max-width: 64em) {
    padding: 10rem 0;
  }

  @media (max-width: 48em) {
    padding: 7.5rem 0;
  }

  @media (max-width: 32em) {
    padding: 5rem 0;
  }
`

export const Container = styled(BaseContainer).attrs({ as: 'div' })``

export const Title = styled(Display)`
  text-align: center;

  max-width: 35rem;
  margin: 0 auto;
  margin-bottom: 0.75rem;
`

export const SubText = styled(BaseBig)`
  text-align: center;

  max-width: 35rem;
  margin: 0 auto;
`

export const MoreWrapper = styled.div`
  margin-top: 7.5em;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3em;

  @media (max-width: 48em) {
    display: block;
  }

  @media (max-width: 32em) {
    margin-top: 5em;
  }
`

export const MoreContent = styled(BaseBig)`
  grid-column: 5 / 11;

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  @media (max-width: 64em) {
    grid-column: 3 / -1;
  }
`
