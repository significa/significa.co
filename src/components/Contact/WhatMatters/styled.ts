import styled, { media } from '@theme'
import Img from 'gatsby-image'
import { Container as BaseContainer, Display, Big as BaseBig } from '../../UI'

export const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.background};

  padding: 12.5rem 0;

  ${media.large} {
    padding: 10rem 0;
  }

  ${media.medium} {
    padding: 7.5rem 0;
  }

  ${media.small} {
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
  margin-top: 7.5rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 3em;

  ${media.medium} {
    display: block;
  }

  ${media.small} {
    margin-top: 5em;
  }
`

export const MoreContent = styled(BaseBig)`
  grid-column: 5 / 11;

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }

  ${media.large} {
    grid-column: 3 / -1;
  }
`

export const ImagesGrid = styled.div`
  margin-top: 7.5rem;
  display: grid;
  grid-column-gap: 3rem;
  grid-template: repeat(2, 1fr) / repeat(3, 1fr);

  ${media.medium} {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 3rem;
  }

  ${media.small} {
    display: none;
  }
`

export const TopLeftImage = styled(Img)`
  margin-top: 3rem;

  ${media.medium} {
    margin: 0;
  }
`

export const CenterImage = styled(Img)`
  grid-row-end: span 2;
`

export const TopRightImage = styled(Img)`
  margin-bottom: 3rem;
  margin-top: 5rem;
  margin-right: 10rem;

  ${media.large} {
    margin-right: 3rem;
    margin-top: 3rem;
  }

  ${media.medium} {
    display: none;
  }
`

export const BottomLeftImage = styled(Img)`
  margin-top: 3rem;
  margin-bottom: 5rem;
  margin-left: 7.5rem;

  ${media.large} {
    margin-left: 3rem;
    margin-bottom: 3rem;
  }

  ${media.medium} {
    display: none;
  }
`

export const BottomRightImage = styled(Img)`
  margin-bottom: 3rem;

  ${media.medium} {
    margin: 0;
  }
`
