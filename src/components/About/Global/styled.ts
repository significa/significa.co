import styled, { media, colors } from '@theme'

import {
  Text as BaseText,
  Title as BaseTitle,
  Container as BaseContainer,
} from '../../UI'

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
`

export const Container = styled(BaseContainer)`
  padding-bottom: 7.5em;
  margin-top: 25%;

  ${media.medium} {
    padding-bottom: 0;
  }

  ${media.xlarge} {
    margin-top: 15%;
  }
`

export const Header = styled.div`
  max-width: 38rem;
  margin: 0 auto;
`

export const Image = styled.div`
  padding-bottom: calc(12em - 25%);
  transform: translateY(-50%);
`

export const Title = styled(BaseTitle)``

export const Text = styled(BaseText)``

export const MapWrapper = styled.div`
  padding-top: 6em;
  position: relative;

  img {
    width: 100%;
  }
`

export const BasePanel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  background: ${colors.lightBlack};
  padding: 0.5em;
  border-radius: 6px;
  display: inline-flex;

  &:after {
    content: '';
    width: 100%;
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    border-bottom: 3px solid ${colors.lightBlack};
  }
`

export const Panel = styled.div`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: calc(1.7em + (26 - 14) * ((100vw - 200px) / (1600 - 200)));
  font-weight: bold;
  min-width: calc(1.7em + (26 - 14) * ((100vw - 200px) / (1600 - 200)));
  min-height: calc(1.7em + (26 - 14) * ((100vw - 200px) / (1600 - 200)));
  border-radius: 2px;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  span {
    margin: auto;
  }

  &:nth-child(4) {
    ${media.medium} {
      display: none;
    }

    span {
      position: relative;
      top: -0.04em;
    }
  }
`
