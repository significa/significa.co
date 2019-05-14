import styled, { media, colors } from '@theme'

export const MapWrapper = styled.div`
  padding-top: 4em;
  position: relative;

  margin-bottom: -4em;

  ${media.medium} {
    margin-bottom: -2em;
  }

  ${media.small} {
    margin-bottom: 0;
  }
`

export const Map = styled.img`
  width: 100%;
`

export const BasePanel = styled.div`
  position: absolute;
  box-sizing: border-box;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);

  background: ${colors.lightBlack};
  padding: 0.5em;
  border-radius: 6px;
  display: inline-flex;

  ${media.small} {
    width: calc((3rem * 3) + (1rem * 2));
    flex-wrap: wrap;
  }
`

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  box-sizing: border-box;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 4em;

  width: 5rem;
  height: 6rem;
  border-radius: 2px;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:nth-child(4) {
    span {
      margin-top: -0.04em;
    }
  }

  ${media.large} {
    font-size: 3em;

    width: 4rem;
    height: 5rem;
  }

  ${media.medium} {
    font-size: 2.5em;

    width: 3rem;
    height: 4rem;
  }

  ${media.small} {
    &:nth-child(4) {
      display: none;
    }

    &:nth-child(3),
    &:last-child {
      margin-right: 0;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      margin-bottom: 0.5rem;
    }
  }
`
