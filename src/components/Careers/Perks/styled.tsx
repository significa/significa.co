import styled from '@theme'
import Img from 'gatsby-image'

import { Container } from '../../UI'
import { Big, Text } from '../../UI/Typography'

export const Wrapper = styled(Container)`
  margin-top: 12em;

  @media (max-width: 64em) {
    padding-left: 0;
    padding-right: 0;
    margin-top: 3em;
  }
`

export const HandleCircle = styled.div`
  position: absolute;
  bottom: 71%;
  left: -5.15%;
  width: 100%;

  @media (max-width: 86em) {
    display: none;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 20%;
    height: 10%;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background} 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`

export const HandleLogo = styled.div`
  text-align: center;

  svg {
    width: 1200px;
    display: inline-block;

    @media (max-width: 86em) {
      width: 100%;
    }
  }
`

export const Title = styled.div`
  position: relative;

  @media (max-width: 64em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  path {
    transition: strokeColor ${({ theme }) => theme.transitions.ease()};
  }
`

export const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12em;

  @media (max-width: 64em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-top: 1em;
  }
`

export const GalleryImage = styled(Img)<{ width: number; height: number }>`
  margin-bottom: 5rem;
  margin-right: 5rem;
  flex-shrink: 0;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  &:last-child {
    margin-right: 0;
  }

  &:nth-child(-n + 2) {
    align-self: flex-end;
  }

  @media (max-width: 64em) {
    &:nth-child(n + 3) {
      display: none;
    }

    margin-bottom: 1.5rem;
    margin-right: 0;
    width: 100%;
  }
`

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > * {
    box-sizing: border-box;
    width: calc(100% / 3 - 4%);

    &:nth-child(3n) {
      padding-right: 0;
    }

    @media (max-width: 64em) {
      width: calc(100% / 2 - 4%);
      padding-right: 0;
    }

    @media (max-width: 32em) {
      width: 100%;
      padding-right: 0;
    }

    img {
      margin-bottom: 1em;
      height: 116px;
    }
  }

  &:after {
    content: '';
    width: calc(100% / 3 - 4%);
  }
`

export const SectionTitle = styled(Big)`
  margin-bottom: 0.5rem;
`

export const SectionText = styled(Text)`
  margin-bottom: 3em;
`
