import styled, { css } from '@theme'

import { NavLink } from '../../UI/'

export const Wrapper = styled.div`
  position: relative;
`

interface IHambuguer {
  show: boolean
}

export const Hamburguer = styled.button`
  display: none;
  position: relative;

  width: 2.5em;
  height: 2.5em;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;

    &:before,
    &:after {
      opacity: 0.8;
    }
  }

  &:before,
  &:after {
    content: '';
    background-color: ${({ theme }) => theme.colors.foreground};
    height: 2px;
    width: 100%;
    left: 0;
    position: absolute;
  }

  &:before {
    top: 0.75em;
    transition: transform ${({ theme }) => theme.transitions.cubic()},
      top ${({ theme }) => theme.transitions.cubic()};
  }

  &:after {
    bottom: 0.75em;
    transition: transform ${({ theme }) => theme.transitions.cubic()},
      bottom ${({ theme }) => theme.transitions.cubic()};
  }

  ${(p: IHambuguer) =>
    p.show &&
    css`
      &:before {
        top: 1.15em;
        transform: rotate(45deg);
      }

      &:after {
        bottom: 1.15em;
        transform: rotate(135deg);
      }
    `}

  @media (max-width: 48em) {
    display: block;
  }
`

interface INavWrapper {
  show: boolean
  itemsHeight: number
}

export const NavWrapper = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2em;

  @media (max-width: 48em) {
    position: absolute;
    z-index: 100;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.foreground};

    top: ${(p: INavWrapper) => (p.show ? 'calc(100% + 1em)' : '100%')};
    max-height: ${(p: INavWrapper) =>
      p.show ? `${p.itemsHeight / 16}em` : '0em'};
    right: 0;

    padding: 0 3em;

    display: flex;
    flex-direction: column;
    text-align: right;

    transition: top ${({ theme }) => theme.transitions.cubic()},
      max-height ${({ theme }) => theme.transitions.cubic()};

    ${NavLink} {
      font-size: 1.25em;
      line-height: 1;
      color: ${({ theme }) => theme.colors.background};

      &:first-child {
        padding-top: 3rem;
      }

      &:last-child {
        padding-bottom: 3rem;
      }
    }
  }
`
